import React from "react";
import { IoMdSearch } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineAccountBox } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";

import "../App.css";
import logo from "../assets/Youku_Logo_3EA6FF_cropped.png";
import search from "../assets/search_24dp_EEEEEE_FILL0_wght400_GRAD0_opsz24.png";

import notifications from "../assets/notifications_24dp_344054_FILL0_wght400_GRAD0_opsz24.png";

import account from "../assets/account_circle_24dp_344054_FILL0_wght400_GRAD0_opsz24.png";

import { IoMdAdd } from "react-icons/io";

import hamburger from "../assets/menu_24dp_344054_FILL0_wght400_GRAD0_opsz24.png";

const Navbar = () => {
    return (
        <>
            <nav className="nav-one">
                <div className="left-side">
                    <RxHamburgerMenu className="hamburger" />
                    <img className="Youkuimg" src={logo} alt="" />
                </div>


                <div className="middle-side">
                    <div className="search-bar">
                        <input
                            type="text"
                            className="search-bar-input"
                            placeholder="Search..."
                        />
                        <IoMdSearch className="search-bar-icon" />
                    </div>
                </div>


                <div className="right-side">
                    <div className="accountbtn">
                        <button
                            className="createAccount"
                            title="Create Account "
                            aria-label="Create Account"
                        >
                            <IoMdAdd className="plus" />
                        </button>
                    </div>
                    <div className="notifs-div">
                        <MdOutlineNotifications className="notifs" />
                    </div>
                    <div className="acc-div">
                        <MdOutlineAccountBox className="acc" />
                    </div>
                </div>
            </nav>
            <nav>
                
            </nav>
        </>
    );
};

export default Navbar;
