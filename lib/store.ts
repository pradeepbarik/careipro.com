import { configureStore } from '@reduxjs/toolkit';
import combineSlices from './slices';
export const makeStore = () => {
    return configureStore({
        reducer: combineSlices,
    })
}
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
