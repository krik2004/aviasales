import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './redux-toolkit/toolkit-slice.js'

const store = configureStore({
  reducer: {
    filter: filterSlice,
  },
})

export default store
