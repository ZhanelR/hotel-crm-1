import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import userReducer from '../slices/usersSlice';
import roomReducer from '../slices/roomsSlice';
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  });

const store = configureStore({
    reducer: {
        user: userReducer, 
        room: roomReducer
    },
    middleware:  (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export { sagaMiddleware, store };