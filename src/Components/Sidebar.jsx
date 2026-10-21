import React from "react";
import { HiHome } from "react-icons/hi2";
import { LuTvMinimalPlay, LuLibraryBig } from "react-icons/lu";
import { SiYoutubeshorts } from "react-icons/si";
import "../App.css";

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sideiconz">
                <HiHome className="homeicon" />
                <p className="sideicontext">Home</p>
            </div>
            <div className="sideiconz">
                <LuTvMinimalPlay className="animeicon" />
                <p className="sideicontext">Anime</p>
            </div>
            <div className="sideiconz">
                <SiYoutubeshorts className="shortsicon" />
                <p className="sideicontext">Shorts</p>
            </div>
            <div className="sideiconz">
                <LuLibraryBig className="libraryicon" />
                <p className="sideicontext">Library</p>
            </div>
        </nav>
    );
};

export default Sidebar;