import React from 'react'
import Navbar from './Navbar'

const N4 = () => {
  return (
    <>
    <div className='min-h-screen'>
    <Navbar />
    <div className='flex flex-col gap-7 text-white items-center justify-center h-150'>
      <div className='flex items-center flex-col'>
        <h1 className='text-5xl'>N4</h1>
        <br />
        <p>Happy Learning!!!</p>
        <br />
        <p>Complete the previous to Learn this :)</p>
      </div>
      {/* <div className="grid grid-cols-3 h-50 gap-4">
        <Link
          to="/hiragana"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-indigo-600 transition text-center border-2 border-white"
        >
          Hiragana
        </Link>
        <Link
          to="/katakana"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-green-600 transition text-center border-2 border-white"
        >
          Katakana
        </Link>
        <Link
          to="/kanji"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-yellow-600 transition text-center border-2 border-white"
        >
          Kanji
        </Link>
        <Link
          to="/vocabulary"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-pink-600 transition text-center border-2 border-white"
        >
          Vocabulary
        </Link>
        <Link
          to="/grammar"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-purple-600 transition text-center border-2 border-white"
        >
          Grammar
        </Link>
        <Link
          to="/quiz"
          className="flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow hover:text-red-600 transition text-center border-2 border-white"
        >
          Quiz
        </Link> 
      </div> */}
    </div>
    </div>
    </>
  )
}

export default N4