import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { search } from './Actions';
import DashboardStat from 'components/DashboardStat';
import Portlet from 'components/Portlet';
import BMaps from 'components/BMaps';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';
import Input from 'components/Input';
import Download from 'components/Button/Download';
import Pickable from 'components/Pickable';
import PickItem from 'components/Pickable/PickItem';
import Echarts from 'components/Echarts';
import { Link } from 'react-router';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
// 组件样式加载
import 'moment/locale/zh-cn';
import moment from 'moment';
import 'rc-calendar/assets/index.css';
// 默认上一个月份
const defaultMonth = moment().subtract(2, 'month');

// 费用类型
const TYPES = {
  ticketAmount: '工单量',
  settlementCost: '结算费用'
};

// 网点数据
const MARKERS = [
  {
    auditMap: {
      id: 1179,
      branchId: 20030917000737,
      branchName: '北京工贸公司售后',
      siteCode: 'HR010003',
      siteName: '北京海纳明川商贸有限公司',
      siteNameForShort: '君正方盛',
      siteAddress: '北京市海淀区农大南路树村临46号树村路口',
      siteLocation: '{"lng":116.31051174256203,"lat":40.027576517854136}',
      createdAt: null,
      updatedAt: 1473302335000
    },
    location: {
      lat: 40.027576,
      lng: 116.31051
    },
    ticketAmount: 2429,
    settlementCost: 128645.29999923706,
    monthOfYear: '2016-07'
  },
  {
    auditMap: {
      id: 1179,
      branchId: 20030917000737,
      branchName: '北京工贸公司售后',
      siteCode: 'HR010003',
      siteName: '北京海纳明川商贸有限公司',
      siteNameForShort: '君正方盛',
      siteAddress: '北京市海淀区农大南路树村临46号树村路口',
      siteLocation: '{"lng":116.31051174256203,"lat":40.027576517854136}',
      createdAt: null,
      updatedAt: 1473302335000
    },
    location: {
      lat: 39.965385,
      lng: 116.29111
    },
    ticketAmount: 2429,
    settlementCost: 128645.29999923706,
    monthOfYear: '2016-07'
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthOfYear: defaultMonth.format('YYYY-MM'),
      type: 'ticketAmount'
    };
    // 监听日期变化
    this.onDateChange = this.onDateChange.bind(this);
    // 监听类型切换
    this.handlePickableChange = this.handlePickableChange.bind(this);
  }
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   const { monthOfYear } = this.state;
  //   dispatch(search({ monthOfYear }));
  // }
  // 监听日期改变
  onDateChange(value) {
    const monthOfYear = value && value.format('YYYY-MM');
    const { dispatch } = this.props;
    dispatch(search({ monthOfYear }));
    this.setState({
      monthOfYear
    });
  }

  // 监听类型切换
  handlePickableChange(params) {
    this.setState({
      type: params.target.value
    });
  }

  // 配置 echart 参数
  initOptions(type) {
    const options = {
      title: {
        text: '六大产品',
        subtext: '图表数据分析',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: `${TYPES[type]} <br/>{b} : {c} ({d}%)`
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: [
          '制冷',
          '厨电',
          '彩电',
          '洗衣机',
          '电热',
          '空调'
        ]
      },
      series: [{
        name: TYPES[type],
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [{
          name: '制冷',
          value: 691214
        },
          {
            name: '厨电',
            value: 147291
          },
          {
            name: '彩电',
            value: 247217
          },
          {
            name: '洗衣机',
            value: 808176
          },
          {
            name: '电热',
            value: 555488
          },
          {
            name: '空调',
            value: 2159995
          }],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    return options;
  }
  renderInputs() {
    const calendar = (<MonthCalendar
      locale={zhCN}
      style={{ zIndex: 1000 }}
    />);
    return (
      <div className="inputs margin-right-15">
        <div className="portlet-input input-small input-inline">
          <DatePicker
            animation="slide-up"
            calendar={calendar}
            defaultValue={defaultMonth}
            onChange={this.onDateChange}
            locale={zhCN}
          >
            {
              ({ value }) => {
                return (
                  <Input
                    type="text"
                    value={(value && value.format('YYYY-MM')) || ''}
                    className="form-control-solid"
                    placeholder="请选择日期"
                    readOnly
                  />
                );
              }
            }
          </DatePicker>
        </div>
      </div>
    );
  }
  renderActions() {
    const { type, monthOfYear } = this.state;
    return (
      <div className="actions">
        <Pickable value={type} onChange={this.handlePickableChange}>
          <PickItem title="工单量" value="ticketAmount" className="grey-salsa" />
          <PickItem title="结算费用" value="settlementCost" className="grey-salsa" />
        </Pickable>
        <Download
          className="blue btn-circle btn-samll margin-left-10"
          url="/api/report/general_analysis"
          paramas={{ monthOfYear }}
        />
      </div>
    );
  }

  render() {
    const { dashboard, isLoading } = this.props;
    const { type } = this.state;
    const router = this.context.router;
    const options = this.initOptions(type, dashboard);
    return (
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link
            to={{ pathname: '/delay' }}
          >
            <DashboardStat
              icon="clock-o"
              name={dashboard.delayWarning.name}
              amount={dashboard.delayWarning.amount}
              rate={dashboard.delayWarning.rate}
              color="red-haze"
              unit="单"
            />
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <Link
            to={{ pathname: '/performance' }}
          >
            <DashboardStat
              icon="thumbs-o-down"
              name={dashboard.complainWarning.name}
              amount={dashboard.complainWarning.amount}
              rate={dashboard.complainWarning.rate}
              color="green-sharp"
              unit="单"
            />
          </Link>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <DashboardStat
            icon="calculator"
            name={dashboard.averageSettlementWarning.name}
            amount={dashboard.averageSettlementWarning.amount}
            rate={dashboard.averageSettlementWarning.rate}
            color="blue-sharp"
            unit="￥"
          />
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <DashboardStat
            icon="cubes"
            name={dashboard.averageOperatingWarning.name}
            amount={dashboard.averageOperatingWarning.amount}
            rate={dashboard.averageOperatingWarning.rate}
            color="purple-soft"
            unit="￥"
          />
        </div>
        <div className="col-md-12">
          <Portlet
            title="产品分析表"
            icon="area-chart"
            color="font-green-sharp"
            inputs={this.renderInputs()}
            actions={this.renderActions()}
            isLoading={isLoading}
          >
            <div className="row">
              <div className="col-md-6">
                <Echarts
                  type="pie"
                  height="400px"
                  options={options}
                  isLoading={isLoading}
                  onEvents={{
                    click: (params) => {
                      router.push({
                        pathname: 'siteindex',
                        query: {
                          productMapping: params.data.name
                        }
                      });
                    }
                  }}
                />
              </div>
              <div className="col-md-6">
                <BMaps
                  akKey="9tRUg7lXFaQEKUBCs24K8tdETGU9tbik"
                  markers={MARKERS}
                />
              </div>
            </div>
          </Portlet>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.basicReducer.dashboard,
    isLoading: state.basicReducer.isFetching
  };
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dashboard: PropTypes.object,
  isLoading: PropTypes.bool
};

Home.contextTypes = {
  router: React.PropTypes.object
};

Home.defaultProps = {
  dashboard: {},
  isLoading: false
};

export default connect(mapStateToProps)(Home);
