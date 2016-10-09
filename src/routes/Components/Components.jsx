import React, { Component } from 'react';
import Portlet from 'components/Portlet';
import Checker from 'components/Checker';
import Echarts from 'components/Echarts';
import BMaps from 'components/BMaps';
import Pickable from 'components/Pickable';

const markers = [
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

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
      r: 'a',
      isLoading: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      r: e.target.value
    });
  }

  handlePickableChange(e) {
    console.log(`value: ${e.target.value}`);
  }


  showLoading() {
    this.setState({
      isLoading: false
    });
  }


  render() {
    const options = {
      title: { text: 'ECharts 入门示例' },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    const events = {
      click: (params) => {
        console.log(params);
        this.showLoading();
      }
    };

    const { isLoading } = this.state;

    return (
      <Portlet
        title="发运手工录入管理"
        subTitle="自定义查询"
        icon="list"
        color="font-green-sharp"
      >
        <div className="row">
          <div className="col-md-12">
            <BMaps
              akKey="9tRUg7lXFaQEKUBCs24K8tdETGU9tbik"
              markers={markers}
            />
          </div>
        </div>
        <Checker
          type="checkbox"
          title="我是 checkbox"
          readOnly
        />

        <Checker
          type="radio"
          value="a"
          checked={this.state.r === 'a'}
          title="我是 radio1"
          onChange={this.handleChange}
        />
        <Checker
          type="radio"
          value="b"
          checked={this.state.r === 'b'}
          title="我是 radio2"
          onChange={this.handleChange}
        />
        <div className="row">
          <div className="col-md-6">
            <Echarts
              type="bar"
              options={options}
              onEvents={events}
            />
          </div>
          <div className="col-md-6">
            <Echarts
              type="bar"
              options={options}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Portlet>
    );
  }
}


export default Components;
