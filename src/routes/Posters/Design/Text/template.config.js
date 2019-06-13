import component from './index';

export default {
  component,
  config: () => ({
    name: '文字组件',
    desc: '文字组件',
    component: 'text',
    content: {
      component: 'textDesign',
      data: {
        enums: '', // user 用户头像 price 商品价格 item 商品名称
        type: 'text', // 组件渲染类型
        content: '文字描述', // 文本内容
        width: 100,
        MaxLineNumber: 2,
        breakWord: false,
        position: {
          x: 0,
          y: 0
        },
      },
    },
    style: [
      // 那些样式是可以编辑的
      {
        key: 'color',
        title: '颜色',
        component: 'color',
        value: '#232323',
      },
      {
        key: 'fontSize',
        title: '大小',
        component: 'slider',
        min: 10,
        max: 100,
        value: '16px',
      },
      {
        key: 'lineHeight',
        title: '行高',
        min: 0,
        max: 100,
        component: 'slider',
        value: '20px',
      },
      {
        key: 'bolder',
        title: '是否加粗',
        component: 'switcher',
        value: false,
      },
      {
        key: 'textAlign',
        title: '对齐方式',
        component: 'radioGroup',
        options: [
          { label: '左对齐', value: 'left' },
          { label: '居中', value: 'center' },
          { label: '右对齐', value: 'right' },
        ],
        value: 'left',
      },
      {
        key: 'textDecoration',
        title: '中/下划线',
        component: 'radioGroup',
        options: [
          { label: '无', value: 'none' },
          { label: '下划线', value: 'underline' },
          { label: '中划线', value: 'line-through' },
        ],
        value: 'none',
      },
    ],
  }),
};
