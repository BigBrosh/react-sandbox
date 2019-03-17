import { takeEvery, call, put } from 'redux-saga/effects';
import { FETCH_ITEMS, FETCH_ITEMS_SUCCESS } from '../../actions/actionTypes';

import { shop } from '../../api';

function* fetchItems() {
  const items = yield call(shop.fetchItems);

  yield put({
    type: FETCH_ITEMS_SUCCESS,
    payload: items.data.shop
  });
}

export function* watchItemsFetch() {
  yield takeEvery(FETCH_ITEMS, fetchItems);
}