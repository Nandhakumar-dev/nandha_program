import React from 'react';
import '../App.css';
import { Drawer, Button, Input, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setSegmentName, setSchemas, addSchema } from '../redux/segmentSlice';
const { Option } = Select;
const SaveSegment = ({ drawerVisible, closeDrawer }) => {
    const dispatch = useDispatch();
    const segmentName = useSelector((state) => state.segment.segmentName);
    const schemas = useSelector((state) => state.segment.schemas);
    const handleSegmentNameChange = (e) => dispatch(setSegmentName(e.target.value));
    const handleSchemaChange = (key, value) => {
        dispatch(setSchemas(
            schemas.map(schema => schema.key === key ? { ...schema, value } : schema)
        ));
    };
    const addNewSchema = () => {
        const lastSchema = schemas[schemas.length - 1];
        if (lastSchema && lastSchema.value === null) {
            message.error('Please select a schema before adding a new one!');
            return;
        }
        dispatch(addSchema());
    };
    const removeSchema = (key) => {
        const updatedSchemas = schemas.filter((schema) => schema.key !== key);
        dispatch(setSchemas(updatedSchemas));
    };
    const getAvailableOptions = (key) => {
        const selectedValues = new Set(schemas.filter((schema) => schema.key !== key).map((schema) => schema.value)
        );
        return [
            { label: 'First Name', value: 'first_name' },
            { label: 'Last Name', value: 'last_name' },
            { label: 'Gender', value: 'gender' },
            { label: 'Age', value: 'age' },
            { label: 'Account Name', value: 'account_name' },
            { label: 'City', value: 'city' },
            { label: 'State', value: 'state' }
        ].filter((option) => !selectedValues.has(option.value));
    };
    const handleSubmit = async () => {
        if (!segmentName) {
            message.error('Please enter the name of the segment!');
            return;
        }
        const validSchemas = schemas.filter((schema) => schema.value !== null);
        if (validSchemas.length === 0) {
            message.error('Please add at least one schema to the segment!');
            return;
        }
        const formattedSchemas = validSchemas.map((schema) => {
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
        console.log('success---->', data);
        const webhookUrl = 'https://webhook.site/f8dcf901-bc20-4b01-b25f-97d6b25c9a56';
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
        <Drawer title="Saving Segment" placement="right" onClose={closeDrawer} visible={drawerVisible} width={400} closeIcon={<span className="custom-close-icon">&lt;</span>}>
            <div className="drawer-content">
                <p>Enter the name of the Segment</p>
                <Input placeholder="Name of the segment" value={segmentName} onChange={handleSegmentNameChange} style={{ marginBottom: 20 }} />
                <p>To save your segment, you need to add the schemas to build the query</p>
                <div className="dot-container">
                    <span className="user-dot"></span> - User Tracks
                    <span className="group-dot"></span> - Group Tracks
                </div>
                {schemas.map((schema) => {
                    const isSelected = schema.value !== null;
                    const dotClass = isSelected
                        ? schema.value === 'account_name' || schema.value === 'state' || schema.value === 'city'
                            ? 'red-dot'
                            : 'green-dot'
                        : 'white-dot';
                    return (
                        <div key={schema.key} className="schema-item">
                            <span className={`dot ${dotClass}`}></span>
                            <Select value={schema.value} onChange={(value) => handleSchemaChange(schema.key, value)} style={{ width: 'calc(100% - 30px)', marginRight: 10 }} placeholder="Add schema to segment" >
                                {getAvailableOptions(schema.key).map((option) => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                            <div className="delete-box" onClick={() => removeSchema(schema.key)}> <span>&#8722;</span>
                            </div>
                        </div>
                    );
                })}
                <Button className="add-new-schema" type="link" onClick={addNewSchema}> + Add new schema </Button>
                <div className="footer-buttons">
                    <Button className="save-segment-button" type="primary" onClick={handleSubmit}> Save the Segment </Button>
                    <Button className="cancel-button" onClick={closeDrawer}> Cancel </Button>
                </div>
            </div>
        </Drawer>
    );
};
export default SaveSegment;
