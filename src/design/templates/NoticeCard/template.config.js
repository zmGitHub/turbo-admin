import component from './index';

export default {
  component,
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
          },
          {
            key: "fontWeight",
            component: "fontWeight",
            value: "300"
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
          },
          {
            key: "fontWeight",
            component: "fontWeight",
            value: "300"
          }
        ]
      },
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
      },
    ]
  })
}
