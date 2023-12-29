import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CreateTaks from '../models/createTaks';
import Card from './Card';

const TodoList = props => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [filterStatus, setFilterStauts] = useState('all');

    useEffect(() => {
        let arr = localStorage.getItem("taskList")
        if(arr)
        {
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, []);

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList);
        setModal(false)
    }

    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const handleOnChange = (e) => {
        const {name, value} = e.target
        if (name === "status")
        {
            setFilterStauts(value)
        }
    }

    const renderedTodoList = taskList.filter(todo => filterStatus === 'all' || filterStatus === todo.Status)
    console.log(renderedTodoList);

    return (
        <>
            <div className="header text-center mt-2">
                <h3 className="mt-3">ToDo List</h3>
                <button className="btn btn-primary" onClick={() => setModal(true)}>Create Task</button>
            </div>
            <div className="task-filter">
                {/* <button className='btn btn-primary me-3' onClick={handleShowAll}>All Task</button>
                <button className='btn btn-info me-3' onClick={handleShowNew}>New</button>
                <button className='btn btn-warning me-3' onClick={handleShowInProgress}>In-Progress</button>
                <button className='btn btn-success me-3' onClick={handleShowDone}>Done</button> */}
                <select className='form-select' value={filterStatus} style={{"width" :"200px"}} onChange={handleOnChange} name='status'>
                    <option value="all">All</option>
                    <option value="New">New</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <div className="task-container">
                {renderedTodoList && renderedTodoList.map((obj, index) => (
                    <Card taskObj = {obj} index = {index} deleteTask={deleteTask} updateListArray = {updateListArray}/>
                ))}
            </div>
            <CreateTaks toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

TodoList.propTypes = {
    
};

export default TodoList;