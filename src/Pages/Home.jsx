import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import N5 from '../Components/N5'
import Footer from './Footer'

const Home = () => {
  return (
    <>
    <div className='min-h-screen'>
    <Navbar />
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4 text-[#ffb366]">Welcome Dharshan 👋</h1>
        <p className="text-lg mb-8 text-center">
          Your personal Japanese study app! Learn Hiragana, Katakana, Kanji, and So on.
        </p>

        <div className='grid grid-cols-3 gap-12'>
          <div className='border-2 border-black dark:border-white w-100 h-50 rounded-2xl flex flex-col items-center justify-center'>
            <h1 className=''>N5</h1>
            <Link to='/n5'>Learn</Link>
          </div>
          <div className='border-2 border-black dark:border-white w-100 h-50 rounded-2xl flex flex-col items-center justify-center'>
            <h1 className=''>N4</h1>
            <Link to='/n4'>Learn</Link>
          </div>
          <div className='border-2 border-black dark:border-white w-100 h-50 rounded-2xl flex flex-col items-center justify-center'>
            <h1 className=''>N3</h1>
            <Link to='/n3'>Learn</Link>
          </div>
          <div className='border-2 border-black dark:border-white w-100 h-50 rounded-2xl flex flex-col items-center justify-center'>
            <h1 className=''>N2</h1>
            <Link to='/n2'>Learn</Link>
          </div>
          <div className='border-2 border-black dark:border-white w-100 h-50 rounded-2xl flex flex-col items-center justify-center'>
            <h1 className=''>N1</h1>
            <Link to='/n1'>Learn</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}

export default Home