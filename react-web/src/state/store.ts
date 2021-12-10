import { configureStore} from '@reduxjs/toolkit';
import moviesReducer from './movies/moviesSlicer'


export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

