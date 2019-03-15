import component from './index';

export default {
  component,
  config: () => ({
    name: '整点秒杀',
    desc: '整点秒杀',
    component: 'seckill',
    content: {
      component: 'seckillDesign',
      data: {
        times: [],
        seckill: {
          startAt: '',
          endAt: '',
          items: [],
        }
      }
    },
    style: []
  })
}
