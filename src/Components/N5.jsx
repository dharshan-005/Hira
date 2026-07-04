import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const N5 = () => {
  return (
    <>
    <div className='min-h-screen'>
    <Navbar />
    <div className='flex flex-col gap-7 items-center justify-center h-150'>
      <div className='flex items-center flex-col'>
        <h1 className='text-5xl'>N5</h1>
        <p>Happy Learning!!!</p>
      </div>
      <div className="grid grid-cols-3 h-50 gap-4">
        <Link
          to="/hiragana"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-indigo-600 transition text-center border-2 dark:border-white border-black"
        >
          Hiragana
        </Link>
        <Link
          to="/katakana"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-green-600 transition text-center border-2 dark:border-white border-black"
        >
          Katakana
        </Link>
        <Link
          to="/kanji"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-yellow-600 transition text-center border-2 dark:border-white border-black"
        >
          Kanji
        </Link>
        <Link
          to="/vocabulary"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-pink-600 transition text-center border-2 dark:border-white border-black"
        >
          Vocabulary
        </Link>
        <Link
          to="/grammar"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-purple-600 transition text-center border-2 dark:border-white border-black"
        >
          Grammar
        </Link>
        <Link
          to="/quiz"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-red-600 transition text-center border-2 dark:border-white border-black"
        >
          Quiz
        </Link>
      </div>
    </div>
    </div>
    </>
  )
}

export default N5