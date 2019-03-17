import Shop from './containers/Shop';
import Basket from './containers/Basket';

export const home_p = '/';
export const basket_p = '/basket';

export default [
  {
    path: home_p,
    title: 'Home',
    exact: true,
    component: Shop
  }, {
    path: basket_p,
    title: 'Basket',
    component: Basket
  }
];