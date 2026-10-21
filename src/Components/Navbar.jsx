import React from "react";
import { IoMdSearch, IoMdAdd } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineAccountBox, MdOutlineNotifications, MdExplore } from "react-icons/md";
import { HiSparkles, HiFire } from "react-icons/hi";
import "../App.css";
import logo from "../assets/Youku_Logo_3EA6FF_cropped.png";

const Navbar = () => {
    return (
        <header className="bili-header">
            <nav className="nav-one">

                <div className="left-side">
                    <button className="hamburger-btn" aria-label="Toggle Sidebar">
                        <RxHamburgerMenu className="hamburger-icon" />
                    </button>
                    <img className="Youkuimg" src={logo} alt="Logo" />
                    <ul className="nav-links">
                        <li className="nav-link active"><HiSparkles /> For you</li>
                        <li className="nav-link"><HiFire /> Trending</li>
                        <li className="nav-link"><MdExplore /> Explore</li>
                    </ul>
                </div>

                <div className="middle-side">
                    <div className="search-bar">
                        <input
                            type="text"
                            className="search-bar-input"
                            placeholder="Search video, creator, or anime..."
                        />
                        <button className="search-btn" aria-label="Search">
                            <IoMdSearch className="search-bar-icon" />
                        </button>
                    </div>
                </div>

                <div className="right-side">
                    <button className="createAccount" title="Upload Video">
                        <IoMdAdd className="plus" />
                        <span>Contribute</span>
                    </button>

                    <div className="icon-action-div" title="Notifications">
                        <MdOutlineNotifications className="action-icon" />
                    </div>

                    <div className="icon-action-div" title="Account">
                        <MdOutlineAccountBox className="action-icon" />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;