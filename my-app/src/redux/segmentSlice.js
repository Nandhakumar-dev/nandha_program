import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    drawerVisible: false,
    segmentName: '',
    schemas: [{ key: Date.now(), value: null }],
};
const segmentSlice = createSlice({
    name: 'segment',
    initialState,
    reducers: {
        setDrawerVisible: (state, action) => {
            state.drawerVisible = action.payload;
        },
        setSegmentName: (state, action) => {
            state.segmentName = action.payload;
        },
        setSchemas: (state, action) => {
            state.schemas = action.payload;
        },
        addSchema: (state, action) => {
            const lastSchema = state.schemas[state.schemas.length - 1];
            if (lastSchema && lastSchema.value === null) {
                return;
            }
            state.schemas.push({ key: Date.now(), value: null });
        },
    },
});
export const { setDrawerVisible, setSegmentName, setSchemas, addSchema } = segmentSlice.actions;
export default segmentSlice.reducer;
