import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../routes';

export default () => (
  <div>
    <h2>Home page</h2>
    <Link to={routes.about}>
      About page
    </Link>
  </div>
);