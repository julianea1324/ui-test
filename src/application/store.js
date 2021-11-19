import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from 'redux-logger'
const persistConfig = {
  key: "root",
  storage,
  whitelist:['items']
};
const middleware = applyMiddleware(thunk,logger);
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer, middleware);
let persistor = persistStore(store);

export { persistor, store };
