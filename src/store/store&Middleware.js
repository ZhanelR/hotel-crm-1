import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/usersSlice';
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userReducer 
    },
    middleware:  (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export { sagaMiddleware, store };