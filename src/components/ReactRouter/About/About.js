import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';

export default () => (
  <div>
    <h2>About page</h2>
    <Link to={routes.home}>
      Home Page
    </Link>
  </div>
);