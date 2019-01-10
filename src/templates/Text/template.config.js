export default {
  component: import('./index'),
  config: {
    name: '标题文字',
    desc: '标题文字',
    component: 'text',
    content: {
      component: 'textDesign',
      data: {
        clickType: 'navigate', // 跳转页面 或者切换 tab
        url: '', // 只能是小程序的页面路径,
        title: '标题文字' // 文本内容
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "title", // 标志唯一
        name: "字体", // 装修组件上的名称
        component: "font", // 引入装修组件
        items: [ // 可编辑的项
          {
            key: "color",
            component: "color",
            value: "#333333"
          },
          {
            key: "fontSize",
            component: "slider",
            value: "14px"
          },
          {
            key: "lineHeight",
            component: "slider",
            value: "40px"
          },
          {
            key: "textAlign",
            component: "checkbox",
            value: "center"
          },
          {
            key: "fontWeight",
            component: "slider",
            value: "normal"
          }
        ]
      }
    ]
  }
}
