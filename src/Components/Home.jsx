import React from 'react'
import { Link } from 'react-router-dom'
import './QuizApp.css'

const Home = () => {
  return (
    <div className='home'>
        <h2 className='H2'>Welcome to this smart quiz application</h2>
        <h2 className='H3'>NOTE: <br /> (1)  We have 41 questions all in general which include Math, English and Science.<br /> (2) Once you click "Next" you cannot go back to the previous question.<br /> (3) The harder the question the more time you will get for them. <br /> (4) By question 22, many of the question become a lot more wordy</h2>
        <h2 className='H4'>🍀 Good Luck with your Exam</h2>
        <Link to={'/quiz'}> <button className='getStarted'> Get Started </button> </Link>
    </div>
  )
}

export default Home