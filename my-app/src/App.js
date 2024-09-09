import './App.css';
import React, { useState } from 'react';
import { Drawer, Button, Input, Select } from 'antd';
import 'antd/dist/reset.css';
const { Option } = Select;
function App() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState(null);
  const showDrawer = () => {
    setDrawerVisible(true);
  };
  const closeDrawer = () => {
    setDrawerVisible(false);
    setSegmentName("");
    setSchemas([]);
    setNewSchema(null);
  };
  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };
  const handleNewSchemaChange = (value) => {
    setNewSchema(value);
  };
  const addNewSchema = () => {
    if (newSchema && !schemas.includes(newSchema)) {
      console.log("Adding new schema:", newSchema);
      setSchemas([...schemas, newSchema]);
      setNewSchema(null);
    }
  };
  const getAvailableOptions = () => {
    const selectedValues = new Set(schemas);
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
    const formattedSchemas = schemas.map(schema => {
      const label = {
        first_name: "First name",
        last_name: "Last name",
        gender: "Gender",
        age: "Age",
        account_name: "Account Name",
        city: "City",
        state: "State"
      }[schema];
      return { [schema]: label };
    });

    const data = {
      segment_name: segmentName,
      schema: formattedSchemas
    };
    console.log("ddddddddhvh", data);

    try {
      const response = await fetch('https://webhook.site/your-unique-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Segment saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save segment.');
    } finally {
      closeDrawer();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <Button type="primary" onClick={showDrawer}>
          Save segment
        </Button>
      </header>
      <Drawer
        title="Saving Segment"
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
        width={400}
      >
        <p>Enter the name of the segment</p>
        <Input
          placeholder="Segment Name"
          value={segmentName}
          onChange={handleSegmentNameChange}
          style={{ marginBottom: 20 }}
        />

        <p>To save your segment, you need to add the schemas to build the query</p>
        {schemas.length > 0 && schemas.map((schema, index) => (
          <Select
            key={index}
            value={schema}
            style={{ width: '100%', marginBottom: 20 }}
            disabled
          >
            {getAvailableOptions().map(option => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        ))}
        <Select
          placeholder="Add schema to segment"
          value={newSchema}
          onChange={handleNewSchemaChange}
          style={{ width: '100%', marginBottom: 20 }}
        >
          {getAvailableOptions().map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
        <Button type="link" onClick={addNewSchema}>
          + Add new schema
        </Button>

        <div style={{ marginTop: 20 }}>
          <Button type="primary" onClick={handleSubmit}>
            Save the segment
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
