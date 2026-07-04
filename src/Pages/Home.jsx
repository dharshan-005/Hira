import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import N5 from "../Components/N5";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="text-4xl font-bold mb-4 text-[#ffb366]">
            Welcome Dharshan 👋
          </h1>
          <p className="text-lg mb-8 text-center">
            Your personal Japanese study app! Learn Hiragana, Katakana, Kanji,
            and So on.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
            <div className="border-2 border-black dark:border-white rounded-2xl h-48 w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">N5</h1>
              <Link
                to="/n5"
                className="mt-4 rounded-lg bg-orange-400 px-6 py-2 text-white hover:bg-orange-500"
              >
                Learn
              </Link>
            </div>
            <div className="border-2 border-black dark:border-white rounded-2xl h-48 w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">N4</h1>
              <Link
                to="/n4"
                className="mt-4 rounded-lg bg-orange-400 px-6 py-2 text-white hover:bg-orange-500"
              >
                Learn
              </Link>
            </div>
            <div className="border-2 border-black dark:border-white rounded-2xl h-48 w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">N3</h1>
              <Link
                to="/n3"
                className="mt-4 rounded-lg bg-orange-400 px-6 py-2 text-white hover:bg-orange-500"
              >
                Learn
              </Link>
            </div>
            <div className="border-2 border-black dark:border-white rounded-2xl h-48 w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">N2</h1>
              <Link
                to="/n2"
                className="mt-4 rounded-lg bg-orange-400 px-6 py-2 text-white hover:bg-orange-500"
              >
                Learn
              </Link>
            </div>
            <div className="border-2 border-black dark:border-white rounded-2xl h-48 w-full flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">N1</h1>
              <Link
                to="/n1"
                className="mt-4 rounded-lg bg-orange-400 px-6 py-2 text-white hover:bg-orange-500"
              >
                Learn
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
