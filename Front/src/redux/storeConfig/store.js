// ** Redux, Thunk & Root Reducer Imports
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import rootReducer from '../reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// ** init middleware
const middleware = [thunk, createDebounce()]

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ** Persist redux state
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  blacklist: ['invoice', 'order', 'salesQuote', 'deliveryNote']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(...middleware)))

const persistor = persistStore(store)

export { store, persistor }