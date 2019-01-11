
export default {
  component: import('./index'),
  config: {
    name: '单张图片',
    desc: '默认样式',
    component: 'image',
    content: {
      component: 'imageDesign',
      data: {
        clickType: 'navigate', // 跳转页面 或者切换 tab
        url: '', // 只能是小程序的页面路径,
        src: '' // 图片链接 必须是 https 开头
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "padding", // 标志唯一
        name: "内边距", // 装修组件上的名称
        component: "paddingAndMargin", // 引入装修组件
        items: [ // 可编辑的项
          {
            key: "paddingTop",
            component: "slider",
            value: "10px"
          },
          {
            key: "paddingBottom",
            component: "slider",
            value: "10px"
          },
          {
            key: "paddingLeft",
            component: "slider",
            value: "20px"
          },
          {
            key: "paddingRight",
            component: "slider",
            value: "20px"
          },
        ]
      },
      {
        key: "img", // 标志唯一
        name: "图像", // 装修组件上的名称
        component: "image", // 引入装修组件
        items: [ // 可编辑的项
          {
            key: "borderRadius",
            component: "slider",
            value: "10px"
          },
          {
            key: "height",
            component: "slider",
            value: "287px"
          },
        ]
      }
    ]
  }
}
