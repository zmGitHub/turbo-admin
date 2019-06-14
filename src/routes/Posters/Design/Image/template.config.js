import component from './index';

export default {
  component,
  config: () => ({
    name: '图片组件',
    desc: '图片组件',
    component: 'image',
    content: {
      component: 'imageDesign',
      data: {
        enums: '', // user 用户头像 price 商品价格 item 商品名称
        type: 'image', // 组件渲染类型
        url: '',
        width: 100,
        height: 100,
        position: {
          x: 0,
          y: 0
        },
      },
    },
    style: [],
  }),
};
