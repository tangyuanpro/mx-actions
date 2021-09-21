require('zx/globals')
const { readFileSync, createWriteStream, writeFileSync } = require('fs')
const { join } = require('path')
const yargs = require('yargs')

const workDir = join(process.cwd(), './dist')
const tmpDir = join(process.cwd(), './tmp')
/**
 * @type any
 */
const argv = yargs.argv
const endpoint = 'https://api.github.com'

const token =
  argv.GH_TOKEN ||
  argv.ghToken ||
  process.env.GH_TOKEN ||
  (() => {
    try {
      return readFileSync('./gh_token', { encoding: 'utf-8' })
    } catch {
      return null
    }
  })()

async function fetchAsset() {
  const owner = argv.owner || 'Innei'
  const repo = argv.repo || 'mx-actions'
  /**
   * @type {number}
   */
  const workflowId = await (async () => {
    const res = await fetch(
      endpoint + `/repos/${owner}/${repo}/actions/workflows`,
    )
    const data = await res.json()

    const workflow = data.workflows.find(
      (w) => w.name === '[Kami] Build & Deploy',
    )
    return workflow?.id
  })()

  const runId = await (async () => {
    const search = new URLSearchParams()
    search.append('per_page', '1')
    const res = await fetch(
      endpoint +
        `/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs` +
        '?' +
        search.toString(),
    )
    const { workflow_runs } = await res.json()
    const runId = workflow_runs[0].id
    return runId
  })()

  await sleep(1000 * 10)
  console.log('waiting 10s')

  const artifactUrl = await (async () => {
    const res = await fetch(
      endpoint + `/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
    )
    const data = await res.json()

    console.log(data)

    const { artifacts } = data
    return artifacts[0].archive_download_url
  })()

  const fileRes = await fetch(artifactUrl, {
    headers: {
      Authorization: 'token ' + token,
    },
  })
  const buffer = await fileRes.buffer()
  writeFileSync(join(tmpDir, 'kami.zip'), buffer)
}

async function pull() {
  cd(join(process.cwd(), './run'))
  if (fs.existsSync(join(process.cwd(), 'run/kami'))) {
    await $`cd kami && git pull`
  } else {
    await $`git clone https://github.com/mx-space/kami.git --depth 1`
  }
  await $`cd kami && pnpm i`
}

async function bootsharp() {
  await $`mkdir -p dist`
  await $`mkdir -p run`
  await $`mkdir -p tmp`

  await pull()
  await fetchAsset()
  cd(tmpDir)

  await $`rm -rf ${join(process.cwd(), 'run/kami/.next')}`
  await $`unzip kami.zip -d ../run/kami/.next`

  cd(process.cwd())
  cd('./run/kami')
  await $`touch .env`
  await $`pm2 reload ecosystem.config.js`
  cd(process.cwd())
  await $`rm -rf tmp`
}

bootsharp()
