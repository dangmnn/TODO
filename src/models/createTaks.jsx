import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function CreateTaks(props) {
    const {modal, toggle, save} = props;
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('New');

    const handleChange = (e) => {
        const {name, value} = e.target

        if(name === "taskName"){
            setTaskName(value)
        }else if (name === "Status")
        {
            setStatus(value)
        }
        else {
            setDescription(value)
        }
    }

    const handleSave = () => {
        let taskObj = {};
        taskObj["Name"] = taskName;
        taskObj["Description"] = description;
        taskObj["Status"] = status
        save(taskObj)
    }
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label> Task Name</label>
                        <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName"/>
                    </div>
                    <div className="form-group">
                        <label> Description</label>
                        <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={handleSave}>Create</button>
                <button className="btn btn-secondary" onClick={toggle}>Cancel</button>
            </ModalFooter>
        </Modal>
    );
}

export default CreateTaks;