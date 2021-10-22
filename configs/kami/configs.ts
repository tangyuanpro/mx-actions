// @ts-nocheck
import { faGithub, faQq, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faBookOpen,
  faCircleNotch,
  faComment,
  faComments,
  faFeatherAlt,
  faGlasses,
  faHistory,
  faMusic,
  faSubway,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { MenuModel, SocialLinkModel } from 'common/store/types'
const menu: MenuModel[] = [
  {
    title: '源',
    path: '/',
    type: 'Home',
    icon: faDotCircle,
    subMenu: [],
  },
  {
    title: '文',
    path: '/posts',
    type: 'Post',
    subMenu: [],
    icon: faGlasses,
  },
  {
    title: '记',
    type: 'Note',
    path: '/notes',
    icon: faFeatherAlt,
  },
  {
    title: '言',
    path: '/says',
    icon: faComments,
  },
  {
    title: '览',
    icon: faHistory,
    path: '/timeline',
    subMenu: [
      {
        title: '生活',
        icon: faFeatherAlt,
        path: '/timeline?type=note',
      },
      {
        title: '博文',
        icon: faBookOpen,
        path: '/timeline?type=post',
      },
      {
        title: '回忆',
        icon: faCircle,
        path: '/timeline?memory=1',
      },
    ],
  },
  {
    title: '友',
    icon: faUserFriends,
    path: '/friends',
  },
  {
    title: '诉',
    icon: faComment,
    path: '/recently',
  },
  {
    title: '余',
    icon: faCircleNotch,
    path: '/favorite/music',
    subMenu: [
      {
        title: '听歌',
        icon: faMusic,
        type: 'Music',
        path: '/favorite/music',
      },
      // {
      //   title: '看番',
      //   icon: faTv,
      //   type: 'Bangumi',
      //   path: '/favorite/bangumi',
      // },
      // {
      //   title: '项目',
      //   icon: faFlask,
      //   type: 'Project',
      //   path: '/projects',
      // },
    ],
  },
  {
    title: '',
    icon: faSubway,
    path: 'https://travellings.link',
  },
]
const social: SocialLinkModel[] = [
  {
    url: 'https://github.com/tangyuanpro',
    title: 'GitHub',
    icon: faGithub,
    color: 'var(--black)',
  },
]
export default {
  url: 'https://yexi.pro',
  alwaysHTTPS: 1,
  social,
  biliId: 365118487,
  homePage: 'https://yexi.pro', // footer link
  menu,
  icp: {
    name: '萌备 20210707 号',
    url: 'https://icp.gov.moe/?keyword=20210707',
  },
  travellings: false, // 开往
  donate: 'https://afdian.net/@syxjy',
}
