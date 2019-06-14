import React from 'react';
import Exception from '@/components/Exception';

const Exception401 = ({ desc }) => (
  <Exception
    type="500"
    desc={desc}
    actions={<a href="https://www.hisense.com/">返回</a>}
    backText="返回"
  />
);

export default Exception401;
