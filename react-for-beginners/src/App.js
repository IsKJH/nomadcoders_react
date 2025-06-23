import './App.css';
import {useEffect, useState} from "react";

function Hello() {
    useEffect(() => {
        console.log("created :)");
        return () => console.log("destoryed :(");
    }, []);
    return <h1>안녕하세요!</h1>;
}

function App() {
    const [showing, setShowing] = useState(false);
    const onClick = () => setShowing((prev) => !prev);
    return (
        <div className="App">
            {showing ? <Hello/> : null}
            <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
        </div>);
}

export default App;
