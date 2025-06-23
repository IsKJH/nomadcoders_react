import './App.css';
import {useState} from "react";

function App() {
    const [toDo, setTodo] = useState("");
    const [toDos, setTodos] = useState([]);
    const onChange = (event) => {
        setTodo(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if (toDo === "") {
            return;
        }
        setTodo("");
        setTodos(currentArray => [toDo, ...currentArray]);
    }
    console.log(toDos);
    return (
        <div className="App">
            <h1>My To Dos ({toDos.length})</h1>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={toDo} type="text"
                    placeholder="Write your to do..."/>
                <button>Add To Do</button>
                <ul>
                    {toDos.map((item, index) => (
                            <li key={index}>{item}</li>
                        )
                    )}
                </ul>
            </form>

        </div>
    );
}

export default App;
