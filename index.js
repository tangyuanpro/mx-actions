// @ts-check
require('zx/globals')
const yargs = require('yargs')
/**
 * @type any
 */
const argv = yargs.argv
const endpoint = 'https://api.github.com'

async function main() {
  const owner = argv.owner || 'wibus-wee'
  const repo = argv.repo || 'Mix-Space-ACTION'
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
    // const workflowId = 4808243
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

  const artifactUrl = await (async () => {
    // const runId = 1152823056
    const res = await fetch(
      endpoint + `/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
    )
    const data = await res.json()

    const { artifacts } = data
    return artifacts[0].archive_download_url
  })()

  console.log(artifactUrl)
}

main()
