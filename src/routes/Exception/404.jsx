import React from 'react';
import { Link } from 'dva/router'
import Exception from '@/components/Exception';

const Exception404 = () => (
  <Exception
    type="404"
    desc="抱歉，你无权访问此页面"
    linkElement={Link}
    backText="返回"
  />
);

export default Exception404;
