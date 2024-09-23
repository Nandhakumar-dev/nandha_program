import { configureStore } from '@reduxjs/toolkit';
import segmentReducer from './segmentSlice';
const store = configureStore({
    reducer: {
        segment: segmentReducer,
    },
});
export default store;
