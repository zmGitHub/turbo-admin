import component from './index';

export default {
  component,
  config: ({ name = '领劵', desc = '领劵', type = 1 }) => ({
    name,
    desc,
    component: 'coupon',
    content: {
      component: 'couponDesign',
      data: {
        type, // 1 为口令 2为手机领劵
        id: '', // 任务 id
        height: '120px',
        background: '#fff'
      }
    },
    style: [ // 那些样式是可以编辑的
      {
        key: "input", // 标志唯一
        name: "输入框", // 装修组件上的名称
        items: [ // 可编辑的项
          {
            key: "width",
            title: '宽度',
            component: "slider",
            min: 40,
            max: 100,
            unit: '%',
            value: "80%"
          },
          {
            key: "left",
            title: '距左边',
            component: "slider",
            min: 0,
            max: 100,
            unit: '%',
            value: "50%"
          },
          {
            key: "top",
            title: '距顶部',
            component: "slider",
            min: 10,
            max: 90,
            unit: '%',
            value: "50%"
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
      },
    ]
  })
}
