import component from './index';

export default {
  component,
  config: () => ({
    name: '轮播图',
    desc: '滑块视图容器',
    component: 'swiper',
    content: {
      component: 'swiperDesign',
      data: {
        items: [],
        interval: '5000' // 自动切换时间间隔
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "img", // 标志唯一img
        name: "图片", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "backgroundColor",
            title: '背景颜色',
            component: "color",
            value: "#ffffff"
          },
          {
            key: "height",
            title: '高度',
            component: "slider",
            min: 50,
            max: 999,
            value: "188px"
          },
        ]
      }
    ]
  })
}
