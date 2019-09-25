import component from './index'

export default {
component,
config:() => ({
  name: '转盘抽奖',
  desc: '转盘抽奖',
  component: 'lottery',
  content: {
    component: 'lotteryDesign',
    data: {
      id: '', // 转盘 id
      backgroundColor: '#fff', // 背景颜色
      src: '' // 图片链接 必须是https开头
    }
  },
  style: [ // 那些样式是可以编辑的
    {
      key: "margin", // 标志唯一
      name: "外边距", // 装修组件上的名称
      items: [ // 可编辑的项
        {
          key: "marginTop",
          title: '外边距(上)',
          component: "slider",
          value: "0"
        },
        {
          key: "marginBottom",
          title: '外边距(下)',
          component: "slider",
          value: "0"
        },
        {
          key: "marginLeft",
          title: '外边距(左)',
          component: "slider",
          value: "0"
        },
        {
          key: "marginRight",
          title: '外边距(右)',
          component: "slider",
          value: "0"
        },
      ]
    }
  ]
})
}
