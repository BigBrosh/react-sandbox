import React, { Fragment } from 'react';

import Header from '../Header';
import Sidebar from '../Sidebar';
import ContentWrap from '../ContentWrap';

export default ({ children }) => (
  <Fragment>
    <Header />
    <Sidebar />
    <ContentWrap>
      {children}
    </ContentWrap>
  </Fragment>
);