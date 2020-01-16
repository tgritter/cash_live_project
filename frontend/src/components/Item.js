import React from 'react';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Item extends React.Component {

  render() {
    const {todo, onChange, onClick} = this.props;
    return (
        <div className="taskContainer">
            <div className="taskItem">
                <div className="inputContainer">
                    <input value={todo.description} onChange={onChange} type="text" id="description" className="taskName" placeholder="What do you need to do?" name="description"/>
                </div>
                <div className="dateContainer">
                    <input type="date" id="dueDate" className="taskDate" name="due_date" value={todo.due_date} onChange={onChange}/>
                </div>
            </div>
            <select className="select" value={todo.state} name="state" onChange={onChange}>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <button className="trashIcon" onClick={onClick}>
                <FontAwesomeIcon icon={faTrash} color={'#777'}/>
            </button>
        </div>

    )
  }
};


export default Item;