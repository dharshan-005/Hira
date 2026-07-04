import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Themes from './Themes'

const Navbar = () => {

  const [levelsOpen, setLevelsOpen] = useState(false)

  const toggleLevels = () => {
    setLevelsOpen(!levelsOpen)
  }

  return (
    <>
    <div className='flex flex-row items-center p-5 justify-around'>
      <div>
        <h1 className=''>HIRA</h1>
      </div>
      <div className='flex flex-row gap-5'>
        <Link to='/' className='cursor-pointer '>Home</Link>

        <h1 className='cursor-pointer '>About</h1>

        <div className='relative'>
          <h1 onClick={toggleLevels} className='cursor-pointer select-none'>Levels</h1>

          {levelsOpen && (
            <div className='absolute top-full mt-1 w-32 bg-white dark:bg-gray-800 rounded shadow-lg z-10'>
              <Link to='/n5' className='block px-4 py-2 cursor-pointer'>N5</Link>
              <Link to='/n4' className='block px-4 py-2 cursor-pointer'>N4</Link>
              <Link to='/n3' className='block px-4 py-2 cursor-pointer'>N3</Link>
              <Link to='/n2' className='block px-4 py-2 cursor-pointer'>N2</Link>
              <Link to='/n1' className='block px-4 py-2 cursor-pointer'>N1</Link>
            </div>
          )}
        </div>        
      <a>|</a>
      <div>
        <h1>Certificates</h1>
      </div>
      </div>
      <Themes />
    </div>
    </>
  )
}

export default Navbar