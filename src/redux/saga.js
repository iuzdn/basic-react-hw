import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

import { put, call } from 'redux-saga/effects';
import {
  receiveTodosSuccess,
  receiveTodosFailure,
  triggerDataLoading,
  triggerTodoLoading,
  addTodoSuccess,
  addTodoFailure,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoSuccess,
  deleteTodoFailure,
  fetchTodos,
} from './actions';

import { takeEvery } from 'redux-saga/effects';
import { ACTION_CONSTANTS } from './constants';
import {
  getDataApi,
  addTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from '../utils/api';

const { FETCH_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } = ACTION_CONSTANTS;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);

function* onFetchTodos() {
  try {
    yield put(triggerDataLoading());
    const data = yield call(getDataApi);
    yield put(receiveTodosSuccess(data));
  } catch (e) {
    yield put(receiveTodosFailure(e));
  }
}

function* onAddTodo({ payload }) {
  try {
    yield put(triggerTodoLoading());
    const todo = yield call(addTodoApi, payload.todo);
    yield put(addTodoSuccess(todo));
    yield put(fetchTodos());
  } catch (e) {
    yield put(addTodoFailure(e.message));
  }
}

function* onUpdateTodo({ payload }) {
  try {
    yield put(triggerTodoLoading());
    const todo = yield call(updateTodoApi, payload);
    yield put(updateTodoSuccess(todo));
    yield put(fetchTodos());
  } catch (e) {
    yield put(updateTodoFailure(e.message));
  }
}

function* onDeleteTodo({ payload }) {
  try {
    yield put(triggerTodoLoading());
    const id = yield call(deleteTodoApi, payload);
    yield put(deleteTodoSuccess(id));
    yield put(fetchTodos());
  } catch (e) {
    yield put(deleteTodoFailure(e.message));
  }
}

export function* saga() {
  yield takeEvery(FETCH_TODOS, onFetchTodos);
  yield takeEvery(ADD_TODO, onAddTodo);
  yield takeEvery(UPDATE_TODO, onUpdateTodo);
  yield takeEvery(DELETE_TODO, onDeleteTodo);
}

export default store;
