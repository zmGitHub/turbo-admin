import component from './index';

export default {
  component,
  config: () => ({
    name: '资讯列表',
    desc: '资讯列表',
    component: 'messageList',
    content: {
      component: 'messageListDesign',
      data: {
        inlineStyle: false,
        display: ['type', 'name', 'desc', 'date', 'read'],
        types: [{ menuId: 0, menuName: '官方资讯', active: true }], // 分类
        list: []
      }
    },
    style: [
      {
        key: "typeFont", // 标志唯一
        name: "分类文字", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "color",
            title: '颜色',
            component: "color",
            value: "#00A6AA"
          },
          {
            key: "fontSize",
            title: '大小',
            component: "slider",
            min: 10,
            max: 100,
            value: "12px"
          },
          {
            key: "fontWeight",
            component: "fontWeight",
            value: "300"
          }
        ]
      },
      {
        key: "titleFont", // 标志唯一
        name: "标题文字", // 装修组件上的名称
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
        key: "descTitle", // 标志唯一
        name: "描述文字", // 装修组件上的名称
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
            value: "12px"
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
