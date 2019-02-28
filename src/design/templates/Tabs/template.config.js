import component from './index';

export default {
  component,
  config: () => ({
    name: '标签页组件',
    desc: '只有在默认模板下才会生效',
    component: 'tabs',
    content: {
      component: 'tabsDesign',
      data: {
        border: true, // 是否显示下划线
        items: [] // [{ key: '', name: '推荐', id: ' }]
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "tabStyle",
        name: "标签容器样式",
        items: [
          {
            key: "borderBottomColor",
            title: '底边颜色',
            component: "color",
            value: "#d2d2d2"
          },
          {
            key: "borderBottomWidth",
            title: '底边高度',
            min: 0,
            max: 100,
            component: "slider",
            value: "1px"
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
        key: "tabItemStyle",
        name: "标签样式",
        items: [
          {
            key: "color",
            title: '字体颜色',
            component: "color",
            value: "#aaa"
          },
          {
            key: "fontSize",
            title: '字体大小',
            component: "slider",
            min: 10,
            max: 100,
            value: "14px"
          },
          {
            key: "height",
            title: '标签高度',
            min: 0,
            max: 100,
            component: "slider",
            value: "30px"
          },
          {
            key: "paddingLeft",
            title: '内边距(左)',
            component: "slider",
            value: "12px"
          },
          {
            key: "paddingRight",
            title: '内边距(右)',
            component: "slider",
            value: "12px"
          },
        ]
      },
      {
        key: "tabItemActiveStyle",
        name: "选中标签样式",
        items: [
          {
            key: "color",
            title: '颜色',
            component: "color",
            value: "#00AAA6"
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
            value: "400"
          },
        ]
      },
      {
        key: "tabBorder", // 标志唯一
        name: "下划线样式", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "borderBottomColor",
            title: '下划线颜色',
            component: "color",
            value: "#00AAA6"
          },
          {
            key: "borderBottomWidth",
            title: '下划线高度',
            min: 0,
            max: 100,
            component: "slider",
            value: "2px"
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
