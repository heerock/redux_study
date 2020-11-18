import { delay, put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

export const increaseAsync = () => ({ type: INCREASE_ASYNC })
export const decreaseAsync = () => ({ type: DECREASE_ASYNC })

function* increaseSaga() {
    yield delay(1000);
    yield put(increase());
}
// delay 1초 기다리는 것
// put -> 액션을 dispatch 하는것
// effects 는 yield 다음 나와야함
function* decreaseSaga() {
    yield delay(1000);
    yield put(decrease());
}

export function* counterSaga() {
    //takeEvery -> 모든 INCREASE_ASYNC 일때 호출
    // takeLeading -> 가장 먼저들어온 DECREASE_ASYNC
    // takeLatest -> 가장 마지막에꺼만 적용
    yield takeEvery(INCREASE_ASYNC, increaseSaga);
    yield takeLeading(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}