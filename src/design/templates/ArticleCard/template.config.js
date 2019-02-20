import component from './index';

export default {
  component,
  config: () => ({
    name: '文章卡片',
    desc: '文章卡片',
    component: 'articleCard',
    content: {
      component: 'articleCardDesign',
      data: {
        id: '', // 文章 id,
        inlineStyle: false,
        display: ['type', 'name', 'desc', 'date', 'read'],
        content: {
          tag: '购物指南',
          mainImage: '',
          name: '产品参数查询',
          articleDesc: '产品参数查询',
          createdAt: +new Date(),
          readTime: 789
        },
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
          }
        ]
      },
      {
        key: "titleFont", // 标志唯一
        name: "分类文字", // 装修组件上的名称
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
          }
        ]
      },
      {
        key: "padding", // 标志唯一
        name: "内边距", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "paddingTop",
            title: '内边距(上)',
            component: "slider",
            value: "0"
          },
          {
            key: "paddingBottom",
            title: '内边距(下)',
            component: "slider",
            value: "0"
          },
          {
            key: "paddingLeft",
            title: '内边距(左)',
            component: "slider",
            value: "0"
          },
          {
            key: "paddingRight",
            title: '内边距(右)',
            component: "slider",
            value: "0"
          },
        ]
      },
    ]
  })
}
