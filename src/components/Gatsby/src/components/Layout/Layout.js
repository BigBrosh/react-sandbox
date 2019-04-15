import React, { Fragment } from 'react';

import Header from '../Header';
import Sidebar from '../Sidebar';

export default ({ children }) => (
  <Fragment>
    <Header />
    <Sidebar />
    {children}
  </Fragment>
);