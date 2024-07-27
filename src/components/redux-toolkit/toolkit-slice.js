import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

export const fetchID = createAsyncThunk('filter/fetchID', async function (_, { rejectWithValue }) {
  try {
    const response = await fetch('https://aviasales-test-api.kata.academy/search')
    if (!response.ok) {
      throw new Error('Server Error!')
    }
    const data = await response.json()
    return data.searchId
  } catch (error) {
    let errorMessage = 'searchId не получен'
    return rejectWithValue(errorMessage)
  }
})

export const fetchApi = createAsyncThunk('filter/fetchApi', async function getData(id, { rejectWithValue, dispatch }) {
  try {
    let stop = false
    let retryCount = 0
    let progressDownloading = false
    let preErrorToggle = false
    while (!stop) {
      try {
        const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
        if (!response.ok) {
          throw new Error('Server Error!')
        }
        const data = await response.json()
        preErrorToggle = false
        dispatch(togglepreError(preErrorToggle))
        dispatch(pushData(data.tickets))
        if (data.stop) {
          stop = true
          progressDownloading = true
        }
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        retryCount++
        preErrorToggle = true
        dispatch(togglepreError(preErrorToggle))
        if (retryCount > 5) {
          return rejectWithValue(error.message)
        } else {
          await new Promise((resolve) => setTimeout(resolve, 100))
          continue
        }
      }
    }
    return progressDownloading
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    sort: 'none',
    isCheckedAll: false,
    isCheckedNoTransfers: false,
    isCheckedOneTransfer: false,
    isCheckedTwoTransfer: false,
    isCheckedThreeTransfers: false,
    status: null,
    preError: null,
    error: null,
    data: [],
    loadingCount: 0,
  },
  reducers: {
    togglepreError(state, action) {
      state.preError = action.payload
    },
    pushData: (state, action) => {
      state.data.push(...action.payload)
      state.loadingCount += 5
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    toggleCheckAll: (state, action) => {
      const newValue = action.payload
      state.isCheckedAll = newValue
      state.isCheckedNoTransfers = newValue
      state.isCheckedOneTransfer = newValue
      state.isCheckedTwoTransfer = newValue
      state.isCheckedThreeTransfers = newValue
    },
    toggleCheckNone: (state, action) => {
      state.isCheckedNoTransfers = action.payload
      if (!action.payload) {
        state.isCheckedAll = false
      }
      if (action.payload && state.isCheckedOneTransfer && state.isCheckedTwoTransfer && state.isCheckedThreeTransfers) {
        state.isCheckedAll = true
      }
    },
    toggleCheckOneTransfer: (state, action) => {
      state.isCheckedOneTransfer = action.payload
      if (!action.payload) {
        state.isCheckedAll = false
      }
      if (action.payload && state.isCheckedNoTransfers && state.isCheckedTwoTransfer && state.isCheckedThreeTransfers) {
        state.isCheckedAll = true
      }
    },
    toggleCheckTwoTransfer: (state, action) => {
      state.isCheckedTwoTransfer = action.payload
      if (!action.payload) {
        state.isCheckedAll = false
      }
      if (action.payload && state.isCheckedNoTransfers && state.isCheckedOneTransfer && state.isCheckedThreeTransfers) {
        state.isCheckedAll = true
      }
    },
    toggleCheckThreeTransfers: (state, action) => {
      state.isCheckedThreeTransfers = action.payload
      if (!action.payload) {
        state.isCheckedAll = false
      }
      if (action.payload && state.isCheckedNoTransfers && state.isCheckedOneTransfer && state.isCheckedTwoTransfer) {
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
        state.status = 'idle'
      })
      .addCase(fetchApi.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
      .addCase(fetchID.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
  },
  selectors: {
    selectFilteredCards: createSelector(
      (state) => state.data,
      (state) => ({
        sort: state.sort,
        isCheckedAll: state.isCheckedAll,
        isCheckedNoTransfers: state.isCheckedNoTransfers,
        isCheckedOneTransfer: state.isCheckedOneTransfer,
        isCheckedTwoTransfer: state.isCheckedTwoTransfer,
        isCheckedThreeTransfers: state.isCheckedThreeTransfers,
        loadingCount: state.loadingCount,
      }),
      (
        data,
        {
          sort,
          isCheckedAll,
          isCheckedNoTransfers,
          isCheckedOneTransfer,
          isCheckedTwoTransfer,
          isCheckedThreeTransfers,
          loadingCount,
        }
      ) => {
        if (
          !isCheckedAll &&
          !isCheckedNoTransfers &&
          !isCheckedOneTransfer &&
          !isCheckedTwoTransfer &&
          !isCheckedThreeTransfers
        ) {
          return []
        }
        return data
          .filter((card) => {
            if (isCheckedAll) {
              return true
            }
            if (isCheckedNoTransfers && (card.segments[0].stops.length === 0 || card.segments[1].stops.length === 0)) {
              return true
            }
            if (isCheckedOneTransfer && (card.segments[0].stops.length === 1 || card.segments[1].stops.length === 1)) {
              return true
            }
            if (isCheckedTwoTransfer && (card.segments[0].stops.length === 2 || card.segments[1].stops.length === 2)) {
              return true
            }
            if (
              isCheckedThreeTransfers &&
              (card.segments[0].stops.length === 3 || card.segments[1].stops.length === 3)
            ) {
              return true
            }
            return false
          })
          .toSorted((a, b) => {
            if (sort === 'none') {
              return 0
            }
            if (sort === 'cheapest') {
              return a.price - b.price
            }
            if (sort === 'fastest') {
              return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
            }
            if (sort === 'fastest') {
              return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
            }
            if (sort === 'optimal') {
              const priceWeight = 0.5
              const durationWeight = 0.5
              const totalDurationA = a.segments[0].duration + a.segments[1].duration
              const totalDurationB = b.segments[0].duration + b.segments[1].duration
              const optimalA = a.price * priceWeight + totalDurationA * durationWeight
              const optimalB = b.price * priceWeight + totalDurationB * durationWeight
              return optimalA - optimalB
            }
            return 0
          })
      }
    ),
  },
})
export const {
  togglepreError,
  pushData,
  setSort,
  toggleCheckAll,
  toggleCheckNone,
  toggleCheckOneTransfer,
  toggleCheckTwoTransfer,
  toggleCheckThreeTransfers,
} = filterSlice.actions
export default filterSlice.reducer
export const selectFilteredCards = filterSlice.selectors.selectFilteredCards
