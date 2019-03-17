import { put, select, takeLatest } from 'redux-saga/effects';
import { REMOVE_FROM_FAVORITES, REMOVE_FROM_FAVORITES_SUCCESS } from '../../actions/actionTypes';

function* removeFromFavorites({ id }) {
  const {
    shop: { favorites }
  } = yield select();

  yield put({
    type: REMOVE_FROM_FAVORITES_SUCCESS,
    favorites: favorites.filter(item => item.id !== id)
  });
}

export function* watchRemovingFromFavorites() {
  yield takeLatest(REMOVE_FROM_FAVORITES, removeFromFavorites);
}