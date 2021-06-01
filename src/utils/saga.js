import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

import { put, call } from 'redux-saga/effects';
import {
  receiveTodosSuccess,
  receiveTodosFailure,
  triggerLoading,
  sortTodos,
} from './actions';

import { takeEvery } from 'redux-saga/effects';
import { ACTION_CONSTANTS } from './constants';
import { MOCK_TODO_DATA as todosData } from './_mocks';

const { FETCH_TODOS } = ACTION_CONSTANTS;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);

function* onFetchTodos() {
  try {
    yield put(triggerLoading());
    const todos = yield call(getData);
    yield put(receiveTodosSuccess(todos));
    yield put(sortTodos());
  } catch (e) {
    yield put(receiveTodosFailure(e));
  }
}

function getData() {
  // API Request
  try {
    const rsp = new Promise((resolve, reject) => {
      if (!todosData) {
        return setTimeout(() => reject(new Error('No todos found')), 250);
      }

      setTimeout(() => resolve(todosData), 250);
    });
    return rsp;
  } catch (error) {
    console.log('-----------------Network Error---------------');
    return error;
  }
}

export function* saga() {
  yield takeEvery(FETCH_TODOS, onFetchTodos);
}

export default store;
