import dataReducer from "../reducers/anesthesiaSheetReducer.js";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        data: dataReducer
    },
});

export default store;