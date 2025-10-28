import React, { useState } from 'react'

const Flashcard = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <>
    <div
      className="w-40 h-40 flex items-center justify-center bg-white shadow-lg rounded-xl cursor-pointer border hover:scale-105 transition p-2 text-center"
      onClick={() => setFlipped(!flipped)}
    >
      <span className="text-lg font-bold whitespace-pre-line">
        {flipped ? back : front}
      </span>
    </div>

    </>
  )
}

export default Flashcard