import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Hiragana from './Pages/Hiragana'
import Katakana from './Pages/Katakana'
import Kanji from './Pages/Kanji'
import Vocabulary from './Pages/Vocabulary'
import Grammar from './Pages/Grammar'
import Quiz from './Pages/Quiz'
import N5 from './Components/N5'
import N4 from './Components/N4'
import N3 from './Components/N3'
import N2 from './Components/N2'
import N1 from './Components/N1'

function App() {

  return (
    <>
    <div className='bg-black text-white'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hiragana" element={<Hiragana />} />
        <Route path="/katakana" element={<Katakana />} />
        <Route path="/kanji" element={<Kanji />} />
        <Route path='/vocabulary' element={<Vocabulary />} />
        <Route path="/grammar" element={<Grammar />} />

        <Route path='/n5' element={<N5 />} />
        <Route path='/n4' element={<N4 />} />
        <Route path='/n3' element={<N3 />} />
        <Route path='/n2' element={<N2 />} />
        <Route path='/n1' element={<N1 />} />

        <Route path="/quiz" element={
          <Quiz 
            dataUrl="/data/hiragana.json" 
            questionKey="char" 
            answerKey="romanji" 
          />
        } /> 
      </Routes>
      </div>
    </>
  )
}

export default App
