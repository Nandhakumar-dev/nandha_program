import { SET_DRAWER_VISIBLE, SET_SEGMENT_NAME, SET_SCHEMAS } from './actions';
const initialState = {
    drawerVisible: false,
    segmentName: '',
    schemas: [{ key: Date.now(), value: null }]
};
export const segmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRAWER_VISIBLE:
            return { ...state, drawerVisible: action.payload };
        case SET_SEGMENT_NAME:
            return { ...state, segmentName: action.payload };
        case SET_SCHEMAS:
            return { ...state, schemas: action.payload };
        default:
            return state;
    }
};
