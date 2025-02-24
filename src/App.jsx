import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import QuizApp from './Components/QuizApp'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/quiz' element={<QuizApp/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
