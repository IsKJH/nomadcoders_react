import React from "react";
import {Link} from "react-router-dom";

const Logo = require("../assets/Netflix_Logo_PMS.png");

const Header = () => {
    return (
        <div className="flex items-center justify-between px-40 py-2">
            <Link to={"/"}>
                <button className="cursor-pointer max-w-24 ">
                    <img src={Logo} alt={Logo}/>
                </button>
            </Link>
            <button className="flex cursor-pointer max-h-6 rounded-lg bg-red-500 text-sm text-white p-3 items-center">
                로그인
            </button>
        </div>
    );
}
export default Header;