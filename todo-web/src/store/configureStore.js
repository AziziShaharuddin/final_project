import {configureStore} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  
import storage from 'redux-persist/lib/storage'; //so when we refresh it will cache in the storage
// import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducers/index';

const persistConfig = {
    key: 'root',
    version: 1,
    storage ,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  
let persistor = persistStore(store);
  
export {store, persistor};
