import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function EditTask(props) {
    const {modal, toggle, updateTask, taskObj} = props;
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [status , setStatus] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "taskName"){
            setTaskName(value)
        }
        if (name === "status")
        {
            setStatus(value)
        }
        if (name === "description")
        {
            setDescription(value)
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        let temObj = {}
        temObj["Name"] = taskName;
        temObj["Description"] = description;
        temObj["Status"] = status;
        updateTask(temObj);
    }

    useEffect(() => {
        setTaskName(taskObj.Name);
        setDescription(taskObj.Description);
        setStatus(taskObj.Status);
    }, []);
    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
                <form>
                    <div style={{"display": "flex"}}>
                    <div className="form-group">
                        <label> Task Name</label>
                        <input type="text" className="form-control" value={taskName} onChange={handleChange} name="taskName"/>
                    </div>
                    <div className="form-group ms-5">
                        <label> Status</label>
                        <select className='form-select' value={status} name='status' onChange={handleChange}>
                            <option value="New">New</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    </div>
                    <div className="form-group">
                        <label> Description</label>
                        <textarea rows="5" className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                <button className="btn btn-secondary" onClick={toggle}>Cancel</button>
            </ModalFooter>
        </Modal>
    );
}

export default EditTask;