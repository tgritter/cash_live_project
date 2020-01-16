import React from 'react';
import axios from "axios";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Item from './Item'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      due_date: '',
      state: '',
      todoList: [],
      errorMessage: '',
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get('/api/todos/')
      .then(res => {
        this.setState({ todoList: res.data})
      })
      .catch(err => console.log(err));
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleAdd = () => {
    const {description, due_date, state} = this.state;
    if(description && due_date && state){
      this.setState({errorMessage: ''})
      axios.post('/api/todos/', {
        description: description,
        due_date: due_date,
        state: state,
      })
      .then(response => { 
        this.refreshList()
        this.setState({
          description: '',
          due_date: '',
          state: '',
        })
      })
      .catch(error => {
          console.log(error.response)
      });
    }else{
      this.setState({errorMessage: 'Please fill out all the fields'})
    }
  }

  handleChangeItem = (e, todo) => {
    const name = e.target.name;
    const value = e.target.value
    const todoList = [...this.state.todoList]
    const item = {
      id: todo.id,
      description: todo.description,
      due_date: todo.due_date,
      state: todo.state
    }

    item[name] = value
    const index = todoList.findIndex(obj => obj.id === todo.id);
    todoList[index][name] = value
    this.setState({todoList})
    axios.put(`/api/todos/${todo.id}/`, item)
  }

  handleDelete = (id) => {
    axios.delete('/api/todos/' + id)
      .then(res => {
          const todoList = [...this.state.todoList];

          todoList.splice(todoList.find(obj => obj.id === id), 1);
          this.setState({todoList})
      })
      .catch((err) => {
          console.log(err);
      })
  }

  handleLogout = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/')
  }

  render() {
    const {description, due_date, state, todoList, errorMessage} = this.state;
    return (
      <div className="App">
        <button className="logout" onClick={this.handleLogout}>Logout</button>
        <div className="container">
          <div className="content">
            <h1>TodoApp</h1>
            <div>
              <div className="inputContainer">
                  <input type="text" id="description" placeholder="What do you need to do?" name="description" value={description} onChange={this.handleChange} required/>
                  <label htmlFor="description">Description</label>
              </div>
              <div className="inputContainer half last">
                <select className="select" name="state" value={state} onChange={this.handleChange}>
                  <option value="">Choose a category</option>
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <label htmlFor="category">Category</label>
              </div>
              <div className="inputContainer half last right">
                  <input type="date" id="dueDate" value={due_date} name="due_date" onChange={this.handleChange}/>
                  <label htmlFor="dueDate">Due Date</label>
              </div>
              <p>{errorMessage}</p>
              <div className="row">
                  <button className="taskAdd" onClick={this.handleAdd}><FontAwesomeIcon icon={faPlus} className="icon-p"/>Add task</button>
              </div>
              <ul className="taskList">
                {todoList.map((todo) => 
                  <Item 
                    key={todo.id}
                    todo={todo} 
                    onChange={(e) => this.handleChangeItem(e, todo)} 
                    onClick={() => this.handleDelete(todo.id)}
                  />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
};


export default Todo;