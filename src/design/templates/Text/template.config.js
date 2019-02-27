import component from './index';

export default {
  component,
  config: () => ({
    name: '标题文字',
    desc: '标题文字',
    component: 'text',
    content: {
      component: 'textDesign',
      data: {
        url: {
          type: 'navigate',
          page: '',
          query: ''
        },
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
            key: "fontWeight",
            component: "fontWeight",
            value: "normal"
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
            options: [
              { label: '左对齐', value: 'left' },
              { label: '居中', value: 'center' },
              { label: '右对齐', value: 'right' },
            ],
            value: "center"
          },
          {
            key: "backgroundColor",
            title: '背景颜色',
            component: "color",
            value: "#ffffff"
          },
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
      }
    ]
  })
}
