import React from "react";

const Spinner = require("../assets/Spinner.gif");
const Loading = () => {
    return (
        <div className="content-center">
            <img src={Spinner} className="w-24"/>
        </div>
    );
}
export default Loading;