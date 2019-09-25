
import React, { PureComponent, Fragment } from 'react'
import { Button, Icon, TimePicker, message } from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import { map, adjust, remove, append, includes } from 'ramda'
import { formatPrice, uniqueId } from '@/utils'


@connect()
class SeckillDesign extends PureComponent {
  timePickerRef = null

  seckill = null

  seckillList = []

  seckillTime = null

  constructor(props) {
    super(props)
    const { config: { data } } = this.props
    const { times, seckill } = data
    this.seckill = seckill
    this.state = { times }
  }

  componentDidMount() {
    this.timePickerRef = document.getElementById('js-timer-picker')
  }

  onBorderChange = (value) => {
    const { config: { id }, onChange } = this.props
    onChange({ id, key: 'border', value })
  }

  // 删除
  deletelItem = (event) => {
    event.stopPropagation()
    const { dataset } = event.currentTarget
    const { times } = this.state
    const { onChange, config: { id } } = this.props
    const newItems = remove(dataset.index, 1, times)
    this.setState({ times: newItems }, () => {
      onChange({ id, key: 'times', value: newItems })
      this.getSeckillList()
    })
  }

  // 添加标签
  addItem = () => {
    const key = uniqueId(4, 4)
    const seckillTime = {
      key,
      hour: null
    }
    this.setState(({ times }) => ({
      times: append(seckillTime, times)
    }))
  }

  confirmChange = ({ currentTarget }) => {
    const { index, time } = currentTarget.dataset
    const seckillIndex = parseInt(index, 10)
    if (this.seckillTime) {
      const hour = this.seckillTime.format('HH:mm')
      const { times } = this.state
      if (!includes({ hour }, times) && hour !== time) {
        const { config, onChange } = this.props
        const updateTimes = adjust(seckillIndex, ({ key }) => ({ key, hour }), times)
        onChange({ id: config.id, key: 'times', value: updateTimes })
        this.setState({ times: updateTimes }, () => {
          this.getSeckillList()
        })
      } else {
        message.warn('当前时间点已在场次列表中')
      }
    } else {
      message.warn('请选择场次时间')
    }
  }

  getSeckillList = () => {
    const { times } = this.state
    const timeArr = map((item) => item.hour, times) || []
    const { dispatch, config, onChange } = this.props
    if (timeArr && timeArr.length) {
      dispatch({
        type: 'component/getSeckill',
        payload: {
          times: timeArr.join(),
          channel: 2,
        },
        callback: (res) => {
          const { firstEndAt, items } = res
          if (items && items.length) {
            const goods = map(({ promotionPrice, item }) => {
              const { id, mainImage, lowPrice, highPrice, seckillInfo: { warmPrice } } = item
              return {
                id,
                mainImage,
                hightPrice: formatPrice(highPrice),
                warmPrice,
                price: formatPrice(lowPrice),
                promotionPrice: formatPrice(promotionPrice),
              }
            }, items)
            onChange({
              id: config.id,
              key: 'seckill',
              value: {
                startAt: res.time,
                endAt: firstEndAt,
                items: goods,
              }
            })
          } else {
            onChange({
              id: config.id,
              key: 'seckill',
              value: {
                startAt: '',
                endAt: '',
                items: [],
              }
            })
            message.info('当前时间点下无秒杀活动')
          }
        }
      })
    } else {
      onChange({
        id: config.id,
        key: 'seckill',
        value: {
          startAt: '',
          endAt: '',
          items: [],
        }
      })
    }
  }

  onTimePickerChange = (time) => {
    this.seckillTime = time
  }

  render() {
    const { times } = this.state
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">场次列表</h4>
          <div id="js-timer-picker" className="content-data-seckill">
            <div className="list-conent">
              {
                times.map(({ key, hour }, index) => (
                  <div key={key} className="list-conent-item">
                    <div className="content">
                      <div className="name">第{index + 1}场</div>
                      <TimePicker
                        use12Hours
                        allowClear={false}
                        defaultValue={hour && moment(hour, 'HH:mm')}
                        minuteStep={60}
                        format="h:mm A"
                        onChange={this.onTimePickerChange}
                        getPopupContainer={() => this.timePickerRef}
                        addon={() => (
                          <Button data-time={hour} data-index={index} size="small" type="primary" onClick={this.confirmChange}>确 认</Button>
                        )}
                      />
                    </div>
                    <div className="actions" data-index={index} onClick={this.deletelItem}>
                      <Icon type="delete" />
                    </div>
                  </div>
                ))
              }
            </div>
            <Button className="ant-btn-add" onClick={this.addItem} icon="plus-circle">添加场次</Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SeckillDesign
