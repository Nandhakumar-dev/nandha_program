export const SET_DRAWER_VISIBLE = 'SET_DRAWER_VISIBLE';
export const SET_SEGMENT_NAME = 'SET_SEGMENT_NAME';
export const SET_SCHEMAS = 'SET_SCHEMAS';
export const setDrawerVisible = (visible) => ({
    type: SET_DRAWER_VISIBLE,
    payload: visible
});
export const setSegmentName = (name) => ({
    type: SET_SEGMENT_NAME,
    payload: name
});
export const setSchemas = (schemas) => ({
    type: SET_SCHEMAS,
    payload: schemas
});
