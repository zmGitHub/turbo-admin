export default {
  component: () => import('./index'),
  config: () => ({
    name: '消息卡片',
    desc: '最新消息列表',
    component: 'noticeCard',
    content: {
      component: 'noticeCardDesign',
      data: {
        items: [],
        title: "最新资讯",
        url: {
          type: 'navigate',
          page: '',
          query: ''
        },
        interval: '5000' // 自动切换时间间隔
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "title", // 标志唯一
        name: "标题字体", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "color",
            title: '颜色',
            component: "color",
            value: "#262626"
          },
          {
            key: "fontSize",
            title: '大小',
            component: "slider",
            min: 10,
            max: 100,
            value: "16px"
          }
        ]
      },
      {
        key: "message", // 标志唯一
        name: "资讯字体", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "color",
            title: '颜色',
            component: "color",
            value: "#5b5b5b"
          },
          {
            key: "fontSize",
            title: '大小',
            component: "slider",
            min: 10,
            max: 100,
            value: "14px"
          }
        ]
      }
    ]
  })
}
