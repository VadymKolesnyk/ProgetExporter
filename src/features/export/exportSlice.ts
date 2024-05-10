import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadEntity, loadReleaseEntity } from './exportApi';
import { store } from '../../app/store';

interface Item {
  type: string;
  number: string;
  name: string;
  developer: string | undefined;
}

// Define a type for the slice state
interface ExportState {
  token: string;
  cardNumber: string;
  items: Item[];
  loading: boolean;
}

type AsyncThunkConfig = {
  state: ReturnType<typeof store.getState>;
  dispatch: typeof store.dispatch;
};

export { type AsyncThunkConfig };

// Define the initial state using that type
const initialState: ExportState = {
  token: '',
  cardNumber: '',
  items: [],
  loading: false,
};

export const counterSlice = createSlice({
  name: 'export',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => ({ ...state, token: action.payload }),
    setCardNumber: (state, action: PayloadAction<string>) => ({ ...state, cardNumber: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      return { ...state, items: action.payload, loading: false };
    });
    builder.addCase(fetchUserById.pending, (state) => {
      return { ...state, items: [], loading: true };
    });
    builder.addCase(fetchUserById.rejected, (state) => {
      return {
        ...state,
        items: [
          {
            type: 'Error',
            number: '0',
            name: 'Error',
            developer: 'Error',
          },
        ],
        loading: false,
      };
    });
  },
});

export const fetchUserById = createAsyncThunk<Item[], void, AsyncThunkConfig>('export/fetchData', async (_, { getState }) => {
  const state = getState();
  const release = await loadReleaseEntity(state.export.token, state.export.cardNumber);
  const bugs = release.bugs.items.map((x) => ({
    type: 'Bug',
    innerType: x.resourceType,
    number: x.id.toString(),
    name: x.name,
  }));
  const userStories = release.userStories.items.map((x) => ({
    type: 'User story',
    innerType: x.resourceType,
    number: x.id.toString(),
    name: x.name,
  }));
  const features = release.features.items.map((x) => ({
    type: 'Feature',
    innerType: x.resourceType,
    number: x.id.toString(),
    name: x.name,
  }));
  return (
    await Promise.all(
      bugs
        .concat(userStories)
        .concat(features)
        .map(async (item) => {
          const entity = await loadEntity(state.export.token, item.innerType, item.number);
          return { ...item, developer: entity.assignments.find((x) => x.roleName === 'Developer')?.fullName };
        })
    )
  ).sort((a, b) => (a.developer ?? '').localeCompare(b.developer ?? ''));
});

export const { setToken, setCardNumber } = counterSlice.actions;

export default counterSlice.reducer;
