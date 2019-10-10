import component from './index'

export default {
  component,
  config: () => ({
    name: '悬浮球',
    desc: '悬浮球',
    component: 'ball',
    content: {
      component: 'ballDesign',
      data: {
        url: {
          type: '',
          page: '',
          query: ''
        },
        image: '', // 图片链接 必须是 https 开头头
        leftImage: '', // 图片链接 必须是 https 开头头
        rightImage: '', // 图片链接 必须是 https 开头头
      }
    },
    style: []
  })
}
