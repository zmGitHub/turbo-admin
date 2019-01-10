import React, { PureComponent, Fragment, Suspense } from 'react'
import { Layout, Icon, Collapse } from 'antd'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import classnames from 'classnames'

import templateMaps from '@/templates'

import './index.less'

const { Content, Sider } = Layout;
const { Panel } = Collapse


// 拖拽元素点
const DragHandle = SortableHandle(() => <div className="drag-btn"><Icon type="drag" /></div>)

/**
 * 点击元素让他在视图区域内居中
 * scrollIntoView是web api 最新浏览器才支持
 * var element = document.getElementById("box");
 * element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
 */
const SortableItem = SortableElement(({ id, cpm }) => {
  // TODO: 这里的数据来源实际上是 dva 了
  const { config, component } = templateMaps[cpm]
  const Lazycomponent = React.lazy(() => component)
  return (
    <div className="drag">
      <div className="drag-component">
        <Suspense fallback={<div>Loading...</div>}>
          <Lazycomponent id={id} style={config.style} title='标题标题' />
        </Suspense>
      </div>
      <DragHandle />
      <div className="drag-tool">
        <div className="drag-tool-item"><Icon type="delete" /></div>
        <div className="drag-tool-item"><Icon type="arrow-up" /></div>
        <div className="drag-tool-item"><Icon type="arrow-down" /></div>
      </div>
    </div>
  )
});

const SortableList = SortableContainer(({ items, handleClick }) => {
  return (
    <div className="container">
      {items.map((item, index) => (
        <SortableItem key={`item-${item.id}`} index={index} cpm={item.componentName} id={item.id} handleClick={handleClick} />
      ))}
    </div>
  );
});

export default class Dashboard extends PureComponent {
  state = {
    templateCollapse: false,
    settingCollapse: false,
    items: [
      {
        id: 1,
        componentName: 'text'
      },
    ]
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { items } = this.state;
    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    });
  }

  chooseModule = () => {
    this.setState({ templateCollapse: true })
  }

  reset = () => {
    this.setState({ templateCollapse: false, settingCollapse: false })
  }

  openSetting = (e) => {
    e.stopPropagation();
    this.setState({ settingCollapse: true })
  }

  render() {
    const { templateCollapse, settingCollapse, items } = this.state
    const designStyle = classnames('x-design-templates', { active: templateCollapse })
    const contentStyle = classnames('x-design-content-panel-mobile', {
      'active-template': templateCollapse && !settingCollapse,
      'active-all': templateCollapse && settingCollapse,
      'active-setting': !templateCollapse && settingCollapse
    })
    const settingStyle = classnames('x-design-setting', { active: settingCollapse })
    return (
      <Fragment>
        <Sider onClick={this.chooseModule} className="x-design-modules">
          <div className="x-design-modules-scroll">
            <Collapse className="x-design-modules-scroll-collapse" bordered={false} defaultActiveKey={['common', 'goods', 'coupon']}>
              <Panel header="常用模块" key="common">
                <div className="module-content">
                  <div className="module-content-item">
                    <div className="module-content-item-title">文字</div>
                    <svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M919.501863 0l12.152847 260.550506h-36.404045q-24.251197-127.250665-72.699095-163.491219-42.45322-36.349548-175.698563-36.349548H562.001064v793.586376q0 84.960937 24.196701 108.994146 30.300373 24.305695 127.250665 30.300372v30.300373H259.106333v-30.300373q96.841299-5.994678 121.146993-36.349547c16.349122-12.152847 24.251197-52.426184 24.251198-121.20149V60.600745H319.652581q-133.354337 0-175.698563 36.349548-48.556892 36.349548-72.699095 163.491218H34.905375L47.003725 0h872.498138z" p-id="4276" />
                      <path d="M984.625865 645.517829l4.46876 96.296327h-13.460777q-8.992017-47.030974-26.867057-60.49175-15.695157-13.460777-64.960511-13.460777H852.361469v293.357743q0 31.390314 8.93752 40.327834 11.1719 8.992017 47.030974 11.226397v11.226397h-167.796488v-11.226397q35.804577-2.23438 44.796594-13.460777c5.940181-4.46876 8.93752-19.400958 8.93752-44.796594v-286.654603h-31.335817q-49.047366 0-64.960511 13.460777-17.929537 13.460777-26.867057 60.49175h-13.40628l4.46876-96.296327h322.513678z" p-id="4277" />
                    </svg>
                  </div>
                  <div className="module-content-item">
                    <div className="module-content-item-title">单张图片</div>
                    <svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M769.495771 282.296686c-37.308343 0-67.552914 30.226286-67.552914 67.518171 0 37.310171 30.244571 67.552914 67.552914 67.552914 37.310171 0 67.483429-30.244571 67.483429-67.552914C836.981029 312.522971 806.807771 282.296686 769.495771 282.296686z" p-id="17082"></path><path d="M5.485714 106.415543l0 503.3344 0 239.550171 0 67.552914 67.536457 0 877.937371 0L1018.514286 916.853029l0-67.552914 0-78.085486L1018.514286 106.415543 5.485714 106.415543zM768.437029 521.120914l-151.431314 151.413029-337.170286-337.152L39.2448 575.972571 39.2448 140.192914l945.492114 0 0 597.246171L768.437029 521.120914z" p-id="17083" />
                    </svg>
                  </div>                  
                  <div className="module-content-item">
                    <div className="module-content-item-title">多张图片</div>
                    <svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M915.2 280.4l-165-8-9.6-107.6c-2-22.6-22.2-38.4-45.8-36.6L102.8 176.8c-23.6 2-40.6 21-38.8 43.4l42.4 471.6c2 22.6 22.4 38.4 45.8 36.6l30-2.4-4.8 91.6c-1.2 25.2 18.4 45.6 44.8 47L882.6 896c26.4 1.2 48.2-17.2 49.6-42.4L960 327C961.2 302 941.4 281.6 915.2 280.4zM205.2 291l-14.2 269.6L156.2 610l-32-356c0-0.4 0-0.6 0-1s0-0.6 0-1c1-10 8.6-18 19-18.8l522-42.8c10.4-0.8 19.4 6 21 15.8 0 0.4 0.6 0.4 0.6 0.8 0 0.2 0.6 0.4 0.6 0.8l5.4 61.6-438-21C228.4 247.6 206.4 266 205.2 291zM873.4 764.8l-93.4-110.6-55-65.4c-4.8-5.8-12.6-10.6-21.2-11-8.6-0.4-15 3-22.2 8.2l-32.8 23.8c-7 4.2-12.4 7-19.8 6.6-7.2-0.4-13.6-3.2-18.2-7.6-1.6-1.6-4.6-4.4-7-6.8l-85.6-97.8c-6.2-7.8-16.4-12.8-27.6-13.4-11.4-0.6-22.4 4.2-29.6 11.2L258.8 719.6l-13.6 14.8 0.6-13.6 13.6-257.8 6.6-125.8c0-0.4 0-0.8 0-1 0-0.4 0-0.8 0-1 2.8-10.8 12.4-18.6 23.8-18l408.4 19.6 57.4 2.8 116.6 5.6c11.6 0.6 20.6 9.4 20.8 20.4 0 0.4 0.6 0.6 0.6 1 0 0.4 0.6 0.6 0.6 1L873.4 764.8zM746.4 524.6c38.8 0 70.4-31.6 70.4-70.4s-31.4-70.4-70.4-70.4c-38.8 0-70.4 31.4-70.4 70.4S707.4 524.6 746.4 524.6z" p-id="7163" />
                    </svg>
                  </div>                  
                </div>
              </Panel>
              <Panel header="商品模块" key="goods">
                <div className="module-content">
                  <div className="module-content-item">
                    <div className="module-content-item-title">商品卡片</div>
                    <svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M512 512c-109.6 0-201.1-79.1-220.3-183.3 12.8-9 21.2-23.9 21.2-40.7 0-27.5-22.3-49.8-49.8-49.8-27.5 0-49.8 22.3-49.8 49.8 0 19.9 11.7 37.1 28.6 45.1 21.6 129.6 134.4 228.7 270 228.7s248.5-99.1 270-228.7a49.69 49.69 0 0 0 28.6-45.1c0-27.5-22.3-49.8-49.8-49.8-27.5 0-49.8 22.3-49.8 49.8 0 16.8 8.4 31.7 21.2 40.7C713.1 432.9 621.6 512 512 512zM860.4 64H658.2c0 0.1 0 0.1 0.1 0.2-12.3 1.5-21.8 12-21.8 24.7s9.5 23.2 21.8 24.7c0 0.1 0 0.1-0.1 0.2h202.2c27.4 0 49.8 22.3 49.8 49.8v696.9c0 27.4-22.3 49.8-49.8 49.8H163.6c-27.4 0-49.8-22.3-49.8-49.8V163.6c0-27.4 22.3-49.8 49.8-49.8H341c0-0.1 0-0.1-0.1-0.2 12.3-1.5 21.8-12 21.8-24.7s-9.5-23.2-21.8-24.7c0-0.1 0-0.1 0.1-0.2H163.5C108.6 64 64 108.7 64 163.6v696.9c0 54.9 44.6 99.6 99.6 99.6h696.9c54.9 0 99.6-44.7 99.6-99.6V163.6c-0.1-55-44.8-99.6-99.7-99.6z m0 0" p-id="45367" />                      
                    </svg>
                  </div>
                  <div className="module-content-item">
                    <div className="module-content-item-title">侧滑商品</div>
                    <svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M885.649481 263.805675 605.413878 263.805675c-17.224179 0-31.139992-13.94987-31.139992-31.139992 0-17.184041 13.915813-31.133911 31.139992-31.133911L885.649481 201.531773c17.218097 0 31.139992 13.94987 31.139992 31.133911C916.789473 249.855805 902.867579 263.805675 885.649481 263.805675L885.649481 263.805675zM885.649481 419.493473 605.413878 419.493473c-17.224179 0-31.139992-13.94987-31.139992-31.139992 0-17.184041 13.915813-31.133911 31.139992-31.133911L885.649481 357.21957c17.218097 0 31.139992 13.94987 31.139992 31.133911C916.789473 405.543603 902.867579 419.493473 885.649481 419.493473L885.649481 419.493473zM885.649481 668.595166 605.413878 668.595166c-17.224179 0-31.139992-13.921895-31.139992-31.139992 0-17.218097 13.915813-31.133911 31.139992-31.133911L885.649481 606.321263c17.218097 0 31.139992 13.915813 31.139992 31.133911C916.789473 654.673271 902.867579 668.595166 885.649481 668.595166L885.649481 668.595166zM885.649481 824.282963 605.413878 824.282963c-17.224179 0-31.139992-13.921895-31.139992-31.139992 0-17.218097 13.915813-31.133911 31.139992-31.133911L885.649481 762.009061c17.218097 0 31.139992 13.915813 31.139992 31.133911C916.789473 810.361069 902.867579 824.282963 885.649481 824.282963L885.649481 824.282963zM387.446096 481.767376 200.624388 481.767376C149.120918 481.767376 107.210493 439.85695 107.210493 388.353481L107.210493 201.531773c0-51.50347 41.910425-93.413895 93.413895-93.413895l186.821708 0c51.50347 0 93.413895 41.910425 93.413895 93.413895l0 186.821708C480.859991 439.85695 438.949565 481.767376 387.446096 481.767376L387.446096 481.767376zM200.624388 170.39178c-17.157282 0-31.139992 13.98271-31.139992 31.139992l0 186.821708c0 17.157282 13.98271 31.139992 31.139992 31.139992l186.821708 0c17.157282 0 31.139992-13.98271 31.139992-31.139992L418.586088 201.531773c0-17.157282-13.98271-31.139992-31.139992-31.139992L200.624388 170.39178 200.624388 170.39178zM387.446096 917.696858 200.624388 917.696858C149.120918 917.696858 107.210493 875.781568 107.210493 824.282963L107.210493 637.455173c0-51.498604 41.910425-93.413895 93.413895-93.413895l186.821708 0c51.50347 0 93.413895 41.915291 93.413895 93.413895l0 186.82779C480.859991 875.781568 438.949565 917.696858 387.446096 917.696858L387.446096 917.696858zM200.624388 606.321263c-17.157282 0-31.139992 13.948654-31.139992 31.133911l0 186.82779c0 17.185257 13.98271 31.133911 31.139992 31.133911l186.821708 0c17.157282 0 31.139992-13.948654 31.139992-31.133911L418.586088 637.455173c0-17.185257-13.98271-31.133911-31.139992-31.133911L200.624388 606.321263 200.624388 606.321263zM200.624388 606.321263" p-id="50208" />
                    </svg>
                  </div>                  
                  <div className="module-content-item">
                    <div className="module-content-item-title">积分商城</div>
                    <svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M787.62786 263.583329l0.247049-0.100252-42.234629 0-4.618741 0-110.130126 0-48.758154 0-136.743385 0-48.758154 0L281.882853 263.483077 239.451301 263.483077c0 0-27.168224-0.880783-27.168224 28.697063l0 192.125315c0 23.408783 8.940308 44.576224 23.201119 60.913678l0 206.41835c0 25.675189 20.791497 46.491748 46.398657 46.491748l463.757427 0c25.660867 0 46.405818-20.816559 46.405818-46.491748l0-206.41835c14.257231-16.337455 23.197538-37.504895 23.197538-60.913678L815.243636 299.222825c-0.304336-1.582545-0.454713-3.723636-0.454713-6.942434C814.792503 262.727608 787.62786 263.583329 787.62786 263.583329L787.62786 263.583329zM444.194014 309.971245l139.149427 0 0 151.072224c0 38.536056-31.135329 69.746573-69.553231 69.746573-38.417902 0-69.596196-31.214098-69.596196-69.746573L444.194014 309.971245 444.194014 309.971245zM258.631608 461.047049 258.631608 309.971245l69.606937 0 69.596196 0 0 151.072224c0 38.536056-31.185455 69.746573-69.596196 69.746573C289.820643 530.793622 258.631608 499.579524 258.631608 461.047049L258.631608 461.047049zM745.64386 705.120671c0 25.675189-20.73779 46.513231-46.348531 46.513231L328.242126 751.633902c-25.614322 0-46.355692-20.838042-46.355692-46.513231l0-131.136448c7.429371 1.937007 15.120112 3.297566 23.154573 3.297566l46.402238 0c27.866406 0 52.574881-12.585175 69.596196-32.066238 16.974769 19.481063 41.683245 32.066238 69.553231 32.066238l46.352112 0c27.862825 0 52.574881-12.585175 69.599776-32.066238 17.021315 19.481063 41.676084 32.066238 69.54607 32.066238l46.402238 0c8.038042 0 15.718042-1.360559 23.150993-3.297566L745.64386 705.120671 745.64386 705.120671zM768.844979 461.047049c0 38.536056-31.135329 69.746573-69.553231 69.746573-38.417902 0-69.553231-31.214098-69.553231-69.746573L629.738517 309.971245l69.553231 0 69.553231 0L768.844979 461.047049 768.844979 461.047049zM513.79021 0C232.02193 0 3.58042 228.94993 3.58042 511.437874c0 282.437818 228.44151 511.437874 510.20979 511.437874 281.721734 0 510.20979-229.000056 510.20979-511.437874C1024 228.94993 795.511944 0 513.79021 0L513.79021 0zM513.79021 978.295944c-257.263888 0-465.769622-209.014154-465.769622-466.86165 0-257.868979 208.505734-466.883133 465.769622-466.883133 257.217343 0 465.715916 209.014154 465.715916 466.883133C979.506126 769.28179 771.007552 978.295944 513.79021 978.295944L513.79021 978.295944zM513.79021 978.295944" p-id="46152" />
                    </svg>
                  </div>                  
                </div>
              </Panel>              
              <Panel header="促销模块" key="coupon">
              <div className="module-content">
                  <div className="module-content-item">
                    <div className="module-content-item-title">秒杀</div>
                    <svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M398.2336 591.5648a9.216 9.216 0 0 0-9.1136-10.6496H162.8672a9.216 9.216 0 0 1-6.5536-15.7184l473.0368-479.0272c6.4-6.4 17.2032-0.9216 15.6672 7.936l-53.6064 330.6496a9.216 9.216 0 0 0 9.216 10.6496h226.2528c8.192 0 12.288 9.8816 6.5024 15.7184l-473.0368 478.976c-6.4 6.4-17.2032 0.9728-15.7184-7.8848l53.6064-330.6496z" p-id="18467" />
                    </svg>
                  </div>
                  <div className="module-content-item">
                    <div className="module-content-item-title">新人礼包</div>
                    <svg className="module-content-item-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M843.080487 288.129256l-72.387657 0 25.541723-52.674687c9.601682-24.457018 14.634302-47.961338 9.157567-66.592674-6.831592-23.235191-21.673625-42.698474-44.112684-57.852616-21.543665-14.548344-49.377594-24.76094-85.101213-31.223119-3.734044-0.63752-75.055416-12.157901-132.692115 24.417109l-30.154787 26.022677-2.158153 0-30.159904-26.02677c-57.628512-36.572964-128.904859-25.058722-132.283816-24.484647-36.123732 6.532787-63.958684 16.745383-85.501326 31.293727-22.439058 15.154141-37.283138 34.618449-44.11473 57.852616-5.478781 18.631336-0.067538 42.134633 9.850345 66.592674l25.959232 52.674687-72.721255 0c-56.18258 0-117.936039 51.418067-117.936039 106.046245l0 78.577636c0 45.921889 37.480636 94.931093 81.114412 106.071827l0 262.893502c0 54.627155 47.02706 104.72925 103.205547 104.72925l528.186657 0c56.178487 0 106.274442-50.102095 106.274442-104.72925L883.046734 578.823941c44.070728-10.848069 76.68452-59.846016 76.68452-106.071827l0-95.339392C959.736371 322.787614 899.259998 288.129256 843.080487 288.129256zM552.133046 165.571966c2.043542-2.367931 4.134157-4.560876 6.291287-6.593162 29.584806-27.884071 75.978439-32.887015 108.888989-27.26804 28.507264 5.15951 49.592488 12.895705 64.484663 22.951735 12.57848 8.495488 19.794835 17.955954 23.058159 29.057803 2.499937 8.497535-7.199982 37.037545-30.306236 79.005378l-14.053064 25.52535L538.497491 288.25103 538.497491 181.370791 552.133046 165.571966zM269.650393 183.723372c3.264347-11.102872 10.478655-20.566408 23.058159-29.060873 14.909571-10.06831 36.020378-17.800411 65.394383-23.112394 32.083719-5.453199 78.416977-0.435928 107.983363 27.431769 2.15099 2.029216 4.245697 4.222161 6.288217 6.590092l13.44829 15.584953 0 107.09411L315.122027 288.25103l-14.052041-25.52535C277.084713 219.160465 267.340791 191.57827 269.650393 183.723372zM198.055798 841.718467 198.055798 578.823941l0-0.864694 208.756511 0 0 315.812759L248.586658 893.772007C222.653009 893.77303 198.055798 868.420619 198.055798 841.718467zM564.835346 577.960271l0 315.812759L459.485973 893.77303l0-315.812759L564.835346 577.960271zM830.374094 841.718467c0 25.667589-26.650987 52.054563-53.600779 52.054563L617.509009 893.77303l0-315.812759 212.865085 0 0 0.864694L830.374094 841.718467zM907.058614 472.753137c0 21.559015-14.378475 44.432978-30.312376 52.532447L151.746076 525.285584c-17.918092-8.723685-34.80469-32.945343-34.80469-52.532447l0-78.577636c0-22.526039 35.19764-53.371558 65.261353-53.371558l66.585511 0 0 0.12075 526.744819 0 0-0.12075 67.547419 0c35.752272 0 63.978127 19.750833 63.978127 36.604686L907.058614 472.753137z" p-id="19232" />
                    </svg>
                  </div>                                    
                </div>                
              </Panel>
            </Collapse>
          </div>
        </Sider>
        <Sider width="375" className={designStyle}>
          <div className="x-design-templates-content">
            <div className="item">fuck</div>
          </div>
        </Sider>
        <Content className="x-design-content">
          <div onClick={this.reset} className="x-design-content-panel">
            <div className={contentStyle}>
              <SortableList helperClass="drag-el" items={items} onSortEnd={this.onSortEnd} useDragHandle />
            </div>
          </div>
        </Content>
        <Sider width="300" className={settingStyle}>
          参数配置
        </Sider>
      </Fragment>
    )
  }
}
