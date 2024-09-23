import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Button } from 'antd';
import SaveSegment from './SaveSegment';
import { useSelector, useDispatch } from 'react-redux';
import { setDrawerVisible, setSegmentName, setSchemas } from './redux/segmentSlice';
const App = () => {
  const dispatch = useDispatch();
  const drawerVisible = useSelector((state) => state.segment.drawerVisible);
  const segmentName = useSelector((state) => state.segment.segmentName);
  const schemas = useSelector((state) => state.segment.schemas);
  const showDrawer = () => dispatch(setDrawerVisible(true));
  const closeDrawer = () => {
    dispatch(setDrawerVisible(false));
    dispatch(setSegmentName(''));
    dispatch(setSchemas([{ key: Date.now(), value: null }]));
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button type="primary" onClick={showDrawer}> Save segment </Button>
      </header>
      <SaveSegment
        drawerVisible={drawerVisible}
        closeDrawer={closeDrawer}
        segmentName={segmentName}
        setSegmentName={(name) => dispatch(setSegmentName(name))}
        schemas={schemas}
        setSchemas={(schemas) => dispatch(setSchemas(schemas))}
      />
    </div>
  );
};
export default App;
