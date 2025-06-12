import employeeReducer from "../reducers/employeeReducer";
import rootSaga from "../sagas/rootSaga";
import { createStore, applyMiddleware,combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

const rootReducer = combineReducers({
    employees:employeeReducer,
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;