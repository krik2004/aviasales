import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { func } from 'prop-types'

export const fetchApi = createAsyncThunk('filter/fetchApi', async function (_, {rejectWithValue}) {
  try {
    const response = await fetch(
      'https://aviasales-test-api.kata.academy/tickets?searchId=900bf795708641216defa7eb2682ee30'
    )
    if(!response.ok){
        throw new Error('Server Error!1')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue (error.message)
  }
})

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    sort: 'none',
    isCheckedAll: false,
    isCheckedNone: false,
    isCheckedOneTransfer: false,
    isCheckedTwoTransfer: false,
    isCheckedThreeTransfers: false,
    status: null,
    error: null,
    data: [],
  },
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload
    },
    toggleCheckAll: (state, action) => {
      const newValue = action.payload // Значение, переданное в качестве payload
      state.isCheckedAll = newValue
      state.isCheckedNone = newValue
      state.isCheckedOneTransfer = newValue
      state.isCheckedTwoTransfer = newValue
      state.isCheckedThreeTransfers = newValue
    },
    toggleCheckNone: (state, action) => {
      state.isCheckedNone = action.payload
      // Если "Ничего" выбрано, снимаем "Все"
      if (!action.payload) {
        state.isCheckedAll = false
      }

      if (action.payload && state.isCheckedOneTransfer && state.isCheckedTwoTransfer && state.isCheckedThreeTransfers) {
        state.isCheckedAll = true
      }
    },
    toggleCheckOneTransfer: (state, action) => {
      state.isCheckedOneTransfer = action.payload
      // Если какой-либо чекбокс из "Один перевод" снят, снимаем "Все"
      if (!action.payload) {
        state.isCheckedAll = false
      }

      if (action.payload && state.isCheckedNone && state.isCheckedTwoTransfer && state.isCheckedThreeTransfers) {
        state.isCheckedAll = true
      }
    },
    toggleCheckTwoTransfer: (state, action) => {
      state.isCheckedTwoTransfer = action.payload
      // Если какой-либо чекбокс из "Два перевода" снят, снимаем "Все"
      if (!action.payload) {
        state.isCheckedAll = false
      }
      if (action.payload && state.isCheckedNone && state.isCheckedOneTransfer && state.isCheckedThreeTransfers) {
        state.isCheckedAll = true
      }
    },
    toggleCheckThreeTransfers: (state, action) => {
      state.isCheckedThreeTransfers = action.payload
      // Если какой-либо чекбокс из "Три перевода" снят, снимаем "Все"
      if (!action.payload) {
        state.isCheckedAll = false
      }
      if (action.payload && state.isCheckedNone && state.isCheckedOneTransfer && state.isCheckedTwoTransfer) {
        state.isCheckedAll = true
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApi.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchApi.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.data = action.payload
      })
      .addCase(fetchApi.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
  },
})

export const {
  setSort,
  toggleCheckAll,
  toggleCheckNone,
  toggleCheckOneTransfer,
  toggleCheckTwoTransfer,
  toggleCheckThreeTransfers,
} = filterSlice.actions //- Эта строка извлекает действие `setSort` из объекта `actions`, который автоматически создаётся с помощью `createSlice`.
//`setSort` — это функция действия (action creator), которая будет использоваться для обновления состояния фильтра в Redux-хранилище.
export default filterSlice.reducer //   - Эта строка экспортирует редюсер (reducer) для среза состояния `filter`.
//  - Редюсер — это функция, которая получает текущее состояние и действие, и возвращает новое состояние на основе этого действия.
//- Экспортируя редюсер по умолчанию, вы можете использовать его при настройке Redux-хранилища.
