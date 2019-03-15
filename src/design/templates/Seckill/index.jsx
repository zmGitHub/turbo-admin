import React, { PureComponent } from 'react'
import Countdown from '@/components/CountDown'
import defaultImg from '@/static/images/x.png'
import { formatImg } from '@/utils'


import './index.less'

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

const format = '?x-oss-process=image/resize,m_fixed,w_108,h_108/format,webp'
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const defaultArr = [
  {
    id: 'demo_1',
    mainImage: defaultImg,
    price: 8888,
    promotionPrice: 7777,
  }
]

class Seckill extends PureComponent {

  constructor(props) {
    super(props)
    const { data: { seckill } } = this.props
    const { startAt, endAt } = seckill
    const now = +new Date()
    let timer = startAt
    if (startAt < now) {
      timer = endAt
    }
    this.state = { timer }
  }


  onTimerEnd = () => {
    const { data: { seckill } } = this.props
    const { endAt } = seckill
    this.state = { timer: endAt }
  }

  defaultFormat = time => {
    const hours = 60 * 60 * 1000
    const minutes = 60 * 1000
    const h = Math.floor(time / hours)
    const m = Math.floor((time - h * hours) / minutes)
    const s = Math.floor((time - h * hours - m * minutes) / 1000)
    return (
      <div className="timer">
        <span className="item">{fixedZero(h)}</span>:<span className="item">{fixedZero(m)}</span>:<span className="item">{fixedZero(s)}</span>
      </div>
    )
  }

  render() {
    const { timer } = this.state
    const { data: { seckill } } = this.props
    const { startAt, items } = seckill
    const goods = items && items.length > 0 ? items : defaultArr
    return (
      <div className='x-template-seckill'>
        <div className="x-template-seckill-header">
          <div className="title">限时秒杀</div>
          <div className="right">
            <span className="desc">{ timer === startAt ? '距开始' : '距结束' }</span>
            <Countdown format={this.defaultFormat} target={timer || deadline} onEnd={this.onTimerEnd} />
          </div>
        </div>
        <div className="x-template-seckill-content">
          {
            goods.map(({ id, mainImage, price, promotionPrice }) => (
              <div key={id} className="x-template-seckill-content-item">
                <div className="x-template-seckill-content-item-img" style={{ backgroundImage: `url(${formatImg(mainImage, format)})` }} />
                <div className="x-template-seckill-content-item-price">
                  <div className="current">¥{promotionPrice}</div>
                  <div className="orign">¥{price}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}


export default Seckill
