// store.ts
import { createStore } from 'redux';
import rootReducer, { RootState } from './reducers/rootReducer'; // Make sure RootState is exported from './reducers/rootReducer'

const store = createStore(rootReducer);

export default store;
