import { call, put } from 'redux-saga/effects';

import api from '../../../services/api';
import { loadSuccess, loadFailure } from './actions';

export function* load() {
	try {
		const response = yield call(api.get, '/users/yagoernandes/repos');

		yield put(loadSuccess(response.data));
	} catch (error) {
    // console.error(error);
    yield put(loadFailure());
  }
}
