import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import "./index.css";
import Home from "./routes/Home.tsx";
import Movie_Detail from "./routes/Movie_Detail.tsx";
import Movie from "./components/Movie.tsx";
import Header from "./components/Header.tsx";

const App = () => (
    <div className="w-full h-screen">
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/Movie_Detail/:id"} element={<Movie_Detail/>}/>
                <Route path={"/Movie"} element={<Movie/>}/>
            </Routes>
        </BrowserRouter>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App/>);