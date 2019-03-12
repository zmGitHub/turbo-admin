import component from './index';

export default {
  component,
  config: () => ({
    name: '新人礼包',
    desc: '新用户注册后提示赠送的优惠券',
    component: 'gift',
    content: {
      component: 'giftDesign',
      data: {
        url: {
          type: 'navigate',
          page: '',
          query: ''
        },
        src: '' // 礼包图片
      }
    },
    style: []
  })
}
