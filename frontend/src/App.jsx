import {useEffect, useState} from 'react'
import logo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"
const URL = API_URL+"/tasks"

function App() {
    const [count, setCount] = useState(0)
    const [todos, setTodos] = useState([]);
    const [taskdescription, setTaskdescription] = useState("");
    const [editingId, setEditingID] = useState(null);
    const [editTaskdescription, setEditingTaskdescription] = useState("");


    /** Is called when the html form is submitted. It sends a POST request to the API endpoint '/tasks' and updates the component's state with the new todo.
    ** In this case a new taskdecription is added to the actual list on the server.
    */
    const handleSubmit = event => {
        event.preventDefault();
        console.log("Sending task description to Spring-Server: " + taskdescription);
        fetch(URL, {  // API endpoint (the complete URL!) to save a taskdescription
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({taskdescription: taskdescription}) // both 'taskdescription' are identical to Task-Class attribute in Spring
        })
            .then(response => {
                console.log("Receiving answer after sending to Spring-Server: ");
                console.log(response);
                window.location.href = "/";
                setTaskdescription("");             // clear input field, preparing it for the next input
            })
            .catch(error => console.log(error))
    }

    /** Is called when ever the html input field value below changes to update the component's state.
   ** This is, because the submit should not take the field value directly.
   ** The task property in the state is used to store the current value of the input field as the user types into it.
   ** This is necessary because React operates on the principle of state and props, which means that a component's state
   ** determines the component's behavior and render.
   ** If we used the value directly from the HTML form field, we wouldn't be able to update the component's state and react to changes in the input field.
   */
    const handleChange = event => {
        setTaskdescription(event.target.value);
    }


    /** Is called when the component is mounted (after any refresh or F5).
    ** It updates the component's state with the fetched todos from the API Endpoint '/'.
    */
    useEffect(() => {
        fetch(URL).then(response => response.json()).then(data => {
            setTodos(data);
        });
    }, []);


    /** Is called when the Done-Button is pressed. It sends a POST request to the API endpoint '/delete' and updates the component's state with the new todo.
     ** In this case if the task with the unique taskdescription is found on the server, it will be removed from the list.
     */
    const handleDelete = (event, id) => {
        console.log("Sending task description to delete on Spring-Server: " + taskdescription);
        fetch(`${URL}/${id}`, { // API endpoint (the complete URL!) to delete an existing taskdescription in the list
            method: "DELETE",
            //body: JSON.stringify({ taskdescription: taskdescription }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                console.log("Receiving answer after deleting on Spring-Server: ");
                console.log(response);
                window.location.href = "/";
            })
            .catch(error => console.log(error))
    }

    /**
     * render all task lines
     * @param {*} todos : Task list
     * @returns html code snippet
    */
    const renderTasks = (todos) => {
        return (
            <ul className="todo-list">

                {todos.map((todo, index) => (
                    <li key={todo.taskdescription}>
                        <span>{"Task " + (index + 1) + ": "}</span>
                        {editingId === todo.taskdescription ? (
                            <>
                                <input data-testid={`edit-input-${todo.id}`} value={editTaskdescription} onChange={handleEditChange} />
                                <button onClick={(e) => handleEditSubmit(todo.id)}>SAVE</button>

                            </>
                        ) : (
                            <>
                                <span>{todo.taskdescription}</span>
                                <button onClick={() => handleEdit(todo.taskdescription, todo.taskdescription)}>EDIT</button>
                                <button onClick={(e) => handleDelete(e, todo.id)}>&#10004;</button>
                            </>
                        )}
                    </li>
                ))}

            </ul >
        );
    }

    const handleEdit = (id = taskdescription) => {
        setEditingID(id);
        setEditingTaskdescription(taskdescription);
    }
    const handleEditChange = (e) => {
        setEditingTaskdescription(e.target.value);
    }
    const handleEditSubmit = (id) => {
        fetch(`http://localhost:8080/tasks/${id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({taskdescription: editTaskdescription})
        }).then((res) => {
            if (!res.ok) throw new Error("Update failed");
            return res.text();
        }).then(() => {
            setEditingID(null);
            setEditingTaskdescription("");
            window.location.href = "/";
        }).catch((err) => console.error(err));
    };
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>
                    The-Sigmas Todo
                </h1>
                <form onSubmit={handleSubmit} className='todo-form'>
                    <label htmlFor="taskdescription">Neues Todo anlegen:</label>
                    <input
                        type="text"
                        value={taskdescription}
                        onChange={handleChange}
                    />
                    <button type="submit">Absenden</button>
                </form>
                <div>
                    {renderTasks(todos)}
                </div>
            </header>
        </div>
    );
}

export default App
