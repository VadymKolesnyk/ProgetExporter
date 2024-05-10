import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loadProgetEntity } from './exportApi';

interface Item {
    type: string;
    number: string;
    name: string;
}

// Define a type for the slice state
interface ExportState {
    token: string;
    cardNumber: string;
    items: Item[];
  }
  
  // Define the initial state using that type
  const initialState: ExportState = {
    token: '',
    cardNumber: '',
    items: []
  }

export const counterSlice = createSlice({
  name: 'export',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => ({...state, token: action.payload }),
    setCardNumber: (state, action: PayloadAction<string>) => ({...state, cardNumber: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
        return {...state, items: action.payload };
    })
  }
})

export const fetchUserById = createAsyncThunk<Item[], void, { state: ExportState }>(
    'export/fetchData',
    async (_, { getState }) => {
        const state = getState();
        const release = await loadProgetEntity(state.token, 'Release', state.cardNumber, '{bugs,userstories}');
        const bugs = release.bugs.items.map(x => ({
            type: x.resourceType,
            number: x.id.toString(),
            name: x.name
        }));
        const userStories = release.userStories.items.map(x => ({
            type: x.resourceType,
            number: x.id.toString(),
            name: x.name
        }));
        return bugs.concat(userStories);
    },
  )

export const { setToken, setCardNumber } = counterSlice.actions

export default counterSlice.reducer