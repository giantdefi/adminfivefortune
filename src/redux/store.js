import { configureStore } from '@reduxjs/toolkit'

//import storage from 'redux-persist/lib/storage' // use in production is ok
import storage from './storage' // prevent console waring message on development

import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'


import GeneralReducer from 'redux/reducers/GeneralReducer'
import ErrorReducer from 'redux/reducers/ErrorReducer'

import FormReducer from 'redux/reducers/FormReducer'
import ModalReducer from 'redux/reducers/ModalReducer'
import LoaderReducer from 'redux/reducers/LoaderReducer'

import ReferralReducer from 'redux/reducers/ReferralReducer'
import AuthReducer from 'redux/reducers/AuthReducer'

import SidebarReducer from 'redux/reducers/SidebarReducer'
import SettingReducer from 'redux/reducers/SettingReducer'

import MainmenuReducer from 'redux/reducers/MainmenuReducer'

import PersistReducer from 'redux/reducers/PersistReducer'

import SoundReducer from 'redux/reducers/SoundReducer' 
import PackageReducer from 'redux/reducers/PackageReducer' 

import ConstantReducer from 'redux/reducers/ConstantReducer' 

import StatsReducer from 'redux/reducers/StatsReducer' 

const rootReducer = combineReducers({

  AuthReducer,
  ConstantReducer,
  ErrorReducer,
  FormReducer,
  GeneralReducer,
  LoaderReducer,
  MainmenuReducer,
  ModalReducer,
  PersistReducer,
  PackageReducer,
  ReferralReducer,
  SoundReducer,
  SettingReducer,
  SidebarReducer,
  SettingReducer,
  StatsReducer,

})

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: [],
  whitelist: ["AuthReducer", "SettingReducer", "ReferralReducer"] //"PersistReducer"
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
//  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

const persistor = persistStore(store)

export { store, persistor }

