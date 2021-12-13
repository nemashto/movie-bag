import { configureStore} from '@reduxjs/toolkit';
import moviesReducer from './movies/moviesSlicer'
import authReducer from './auth/authSlicer'
import messageReducer from './core/messageSlicer'


export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    message: messageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

