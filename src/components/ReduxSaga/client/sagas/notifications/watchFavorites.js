import { takeEvery } from 'redux-saga/effects';
import { ADD_TO_FAVORITES_SUCCESS } from '../../actions/actionTypes';

function* notificate({ item }) {
  yield console.log(`You've added ${item.name} to favorites`);
}

export function* notificateFavorite() {
  yield takeEvery(ADD_TO_FAVORITES_SUCCESS, notificate);
}