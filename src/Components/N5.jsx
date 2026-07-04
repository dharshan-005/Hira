import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const N5 = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">N5</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Happy Learning!!!
          </p>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/hiragana"
            className="flex h-32 items-center justify-center rounded-xl border-2 border-black dark:border-white font-bold shadow transition hover:text-indigo-600"
          >
            Hiragana
          </Link>

          <Link
            to="/katakana"
            className="flex h-32 items-center justify-center rounded-xl border-2 border-black dark:border-white font-bold shadow transition hover:text-green-600"
          >
            Katakana
          </Link>

          <Link
            to="/kanji"
            className="flex h-32 items-center justify-center rounded-xl border-2 border-black dark:border-white font-bold shadow transition hover:text-yellow-600"
          >
            Kanji
          </Link>

          <Link
            to="/vocabulary"
            className="flex h-32 items-center justify-center rounded-xl border-2 border-black dark:border-white font-bold shadow transition hover:text-pink-600"
          >
            Vocabulary
          </Link>

          <Link
            to="/grammar"
            className="flex h-32 items-center justify-center rounded-xl border-2 border-black dark:border-white font-bold shadow transition hover:text-purple-600"
          >
            Grammar
          </Link>

          <Link
            to="/quiz"
            className="flex h-32 items-center justify-center rounded-xl border-2 border-black dark:border-white font-bold shadow transition hover:text-red-600"
          >
            Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default N5;
