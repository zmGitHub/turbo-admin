import { query, get } from 'containers/fetch';
import {
  LOAD_DATA_FAILURE,
  LOAD_DATA_INITIATION,
  RECEIVE_SERVICE_TYPES,
  RECEIVE_INDUSTRY,
  RECEIVE_SITE,
  RECEIVE_SERVICE_WAYS,
  FIND_INDUSTRY
} from 'containers/constants';

export function initionRequest() {
  return {
    type: LOAD_DATA_INITIATION
  };
}

export function receiveError(res) {
  return {
    type: LOAD_DATA_FAILURE,
    error: res
  };
}

export function find(res) {
  return {
    type: FIND_INDUSTRY,
    data: res
  };
}

// 获取服务类型 存到 state 里面
export function receiveServiceTypes(res) {
  const arrs = res.result.map((type) => {
    return {
      label: type.serviceType,
      value: type.serviceType
    };
  });
  return {
    type: RECEIVE_SERVICE_TYPES,
    data: arrs
  };
}

// 获取服务方式 存到 state 里面
export function receiveServiceWays(res) {
  const arrs = res.result.map((manner) => {
    return {
      label: manner.serviceManner,
      value: manner.serviceManner
    };
  });
  return {
    type: RECEIVE_SERVICE_WAYS,
    data: arrs
  };
}

// 存储工贸
export function receiveIndustry(res) {
  const arrs = res.result.map((industry) => {
    return {
      label: industry.branchName,
      value: industry.branchId,
    };
  });
  return {
    type: RECEIVE_INDUSTRY,
    data: arrs
  };
}
// 存储网点
export function receieveSite(sites = []) {
  const arrs = sites.map((site) => {
    return {
      label: site.siteNameForShort,
      value: site.siteCode
    };
  });
  return {
    type: RECEIVE_SITE,
    data: arrs
  };
}
export function findIndustry() {
  return (dispatch) => {
    return query('/api/branches').then((response) => {
      if (response) {
        dispatch(receiveIndustry(response));
      }
    }, (error) => {
      Notification.open({
        type: 'warning',
        title: '获取数据失败',
        content: '未知错误'
      });
      dispatch(receiveError(error));
    });
  };
}
export function findSite(branchId = '') {
  return (dispatch) => {
    return query('/api/sites', { branchId }).then((response) => {
      if (response.result) {
        dispatch(receieveSite(response.result));
      }
    }, (error) => {
      Notification.open({
        type: 'warning',
        title: '获取数据失败',
        content: '未知错误'
      });
      dispatch(receiveError(error));
    });
  };
}

// 获取服务类型
export function getServiceTypes(params) {
  return (dispatch) => {
    return get('/api/service_types', params).then((response) => {
      if (response) {
        dispatch(receiveServiceTypes(response));
      }
    }, (error) => {
      Notification.open({
        type: 'warning',
        title: '获取数据失败',
        content: '未知错误'
      });
      dispatch(receiveError(error));
    });
  };
}

// 获取服务方式
export function getServiceWays(params) {
  return (dispatch) => {
    return get('/api/service_manners', params).then((response) => {
      if (response) {
        dispatch(receiveServiceWays(response));
      }
    }, (error) => {
      Notification.open({
        type: 'warning',
        title: '获取数据失败',
        content: '未知错误'
      });
      dispatch(receiveError(error));
    });
  };
}
