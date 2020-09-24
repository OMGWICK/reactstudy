import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
// import createSagaMiddleware from 'redux-saga';
// import mySagas from '../sagas';
import thunk from 'redux-thunk';
const composeE = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const eHandler = composeE(applyMiddleware(thunk));
// const sagaMiddleware = createSagaMiddleware();
// const eHandler = composeE(applyMiddleware(sagaMiddleware));
// const store = createStore(reducer, eHandler);
// sagaMiddleware.run(mySagas);
const store = createStore(reducer, eHandler);

export default store;
