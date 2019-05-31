import React from 'react';
import Exception from '@/components/Exception';

const Exception401 = () => (
  <Exception
    type="401"
    desc="抱歉，你无权访问此页面"
    actions={<a href="https://www.hisense.com/">返回</a>}
    backText="返回"
  />
);

export default Exception401;
