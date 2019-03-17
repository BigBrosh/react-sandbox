import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import items from './reducer/items';
import sidebar from './reducer/sidebar';
import basket from './reducer/basket';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  items,
  sidebar,
  basket
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);