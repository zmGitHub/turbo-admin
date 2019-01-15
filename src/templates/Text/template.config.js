import Text from './index'

export default {
  component: import('./index'),
  // component: Text,
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
        items: [ // 可编辑的项
          {
            key: "color",
            title: '颜色',
            component: "color",
            value: "#333333"
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
            key: "lineHeight",
            title: '行高',
            min: 0,
            max: 100,
            component: "slider",
            value: "40px"
          },
          {
            key: "textAlign",
            title: '对齐方式',
            component: "radioGroup",
            value: "center"
          }
        ]
      }
    ]
  }
}
