import React, { useState } from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Drawer, Button, Input, Select, message } from 'antd';
const { Option } = Select;
const App = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([{ key: Date.now(), value: null }]);
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => {
    setDrawerVisible(false);
    setSegmentName('');
    setSchemas([{ key: Date.now(), value: null }]);
  };
  const handleSegmentNameChange = (e) => setSegmentName(e.target.value);
  const handleSchemaChange = (key, value) => {
    setSchemas((prevSchemas) =>
      prevSchemas.map((schema) =>
        schema.key === key ? { ...schema, value } : schema
      )
    );
  };
  const addNewSchema = () => {
    const lastSchema = schemas[schemas.length - 1];
    if (lastSchema && lastSchema.value === null) {
      message.error('Please select a schema before adding a new one!');
      return;
    }
    setSchemas([...schemas, { key: Date.now(), value: null }]);
  };
  const removeSchema = (key) => {
    setSchemas((prevSchemas) => prevSchemas.filter((schema) => schema.key !== key));
  };
  const getAvailableOptions = (key) => {
    const selectedValues = new Set(schemas.filter((schema) => schema.key !== key).map(schema => schema.value));
    return [
      { label: 'First Name', value: 'first_name' },
      { label: 'Last Name', value: 'last_name' },
      { label: 'Gender', value: 'gender' },
      { label: 'Age', value: 'age' },
      { label: 'Account Name', value: 'account_name' },
      { label: 'City', value: 'city' },
      { label: 'State', value: 'state' }
    ].filter(option => !selectedValues.has(option.value));
  };
  const handleSubmit = async () => {
    if (!segmentName) {
      message.error('Please enter the name of the segment!');
      return;
    }
    const validSchemas = schemas.filter(schema => schema.value !== null);
    if (validSchemas.length === 0) {
      message.error('Please add at least one schema to the segment!');
      return;
    }
    const formattedSchemas = validSchemas.map(schema => {
      const label = {
        first_name: 'First name',
        last_name: 'Last name',
        gender: 'Gender',
        age: 'Age',
        account_name: 'Account Name',
        city: 'City',
        state: 'State'
      }[schema.value];
      return { [schema.value]: label };
    });
    const data = {
      segment_name: segmentName,
      schema: formattedSchemas
    };
    console.log("success---->", data);
    const webhookUrl = 'https://webhook.site/cd4091f4-8512-434b-8a77-9e621f3582ee';
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // if (!response.ok) {
      //   throw new Error('Network response was not ok!');
      // }
      // const result = await response.json();
      // console.log('result---->:', result);
      message.success('Data sent successfully!');
    } catch (error) {
      console.error('Error---->', error);
      alert('Network Error saving segment!');
    } finally {
      setSchemas([{ key: Date.now(), value: null }]);
      closeDrawer();
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button type="primary" onClick={showDrawer}> Save segment </Button>
      </header>
      <Drawer title="Saving Segment" placement="right" onClose={closeDrawer} visible={drawerVisible} width={400}>
        <p>Enter the name of the Segment</p>
        <Input placeholder="Name of the segment" value={segmentName} onChange={handleSegmentNameChange} style={{ marginBottom: 20 }} />
        <p>To save your segment, you need to add the schemas to build the query</p>
        <div className="dot-container">
          <span className="user-dot"></span> -User Tracks
          <span className="group-dot"></span> -Group Tracks
        </div>
        {schemas.map((schema) => (
          <div key={schema.key} className="schema-item">
            <Select value={schema.value} onChange={(value) => handleSchemaChange(schema.key, value)} style={{ width: 'calc(100% - 30px)', marginRight: 10 }} placeholder="Add schema to segment">
              {getAvailableOptions(schema.key).map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <div className="delete-box" onClick={() => removeSchema(schema.key)}> &#8722; </div>
          </div>
        ))}
        <Button type="link" onClick={addNewSchema}> + Add new schema </Button>
        <div style={{ position: 'absolute', bottom: 20, left: 20, width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
          <Button style={{ marginRight: 8 }} type="primary" onClick={handleSubmit}> Save the Segment </Button>
          <Button onClick={closeDrawer}>Cancel</Button>
        </div>
      </Drawer>
    </div>
  );
};
export default App;
