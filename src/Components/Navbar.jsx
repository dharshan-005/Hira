import React, { useState } from "react";
import { Link } from "react-router-dom";
import Themes from "./Themes";

const Navbar = () => {
  const [levelsOpen, setLevelsOpen] = useState(false);

  const toggleLevels = () => {
    setLevelsOpen(!levelsOpen);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between p-4 md:px-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">HIRA</h1>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link to="/">Home</Link>

          <h1 className="cursor-pointer">About</h1>

          <div className="relative">
            <h1 onClick={toggleLevels} className="cursor-pointer select-none">
              Levels
            </h1>

            {levelsOpen && (
              <div className="absolute top-full mt-2 w-32 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                <Link to="/n5" className="block px-4 py-2">
                  N5
                </Link>
                <Link to="/n4" className="block px-4 py-2">
                  N4
                </Link>
                <Link to="/n3" className="block px-4 py-2">
                  N3
                </Link>
                <Link to="/n2" className="block px-4 py-2">
                  N2
                </Link>
                <Link to="/n1" className="block px-4 py-2">
                  N1
                </Link>
              </div>
            )}
          </div>

          <span className="hidden md:block">|</span>

          <h1>Certificates</h1>
        </div>

        <Themes />
      </div>
    </>
  );
};

export default Navbar;
