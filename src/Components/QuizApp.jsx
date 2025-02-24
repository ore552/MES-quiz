import { useState, useEffect } from 'react';
import './QuizApp.css';
import { questions } from './Questions';
import { Link } from 'react-router-dom'

const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(questions[0].timer);
    const [quizComplete, setQuizComplete] = useState(false);

    useEffect(() => {
        setTimeLeft(questions[currentQuestion].timer); // Reset timer when the question changes
    }, [currentQuestion]);

    useEffect(() => {
        if (quizComplete) return; // Stop timer when quiz is complete

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    handleNextQuestion();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, quizComplete]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }

        setSelectedOption('');

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setQuizComplete(true);
        }
    };

    const renderOptions = () => {
        return questions[currentQuestion].options.map((option, index) => (
            <button 
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`option ${selectedOption === option ? 'selected' : ''}`}
            >
                {option}
            </button>
        ));
    };

    const renderQuizContent = () => {
        if (quizComplete) {
            return (
                <div className="quiz-container">
                    <h1>Quiz Completed!</h1>
                    <p className="scoresheet">
                        Your Total Score: {score} out of {questions.length}
                    </p>
                    <p className="totalScore">
                        Your Total Score is: <span className="score">{score}</span>
                    </p>
                    <Link to={'/'}><button>Home</button></Link>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Quiz App</h1>
                    <p>Question {currentQuestion + 1}</p>
                    <p>Time Left: {timeLeft} seconds</p>
                    <h2 className="questions">{questions[currentQuestion].questionText}</h2>
                    {renderOptions()}
                    <button
                        onClick={handleNextQuestion}
                        disabled={!selectedOption}
                        className="next-button"
                    >
                        Next
                    </button>
                </div>
            );
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return <div className="quiz-container">{renderQuizContent()}</div>;
};

export default QuizApp;
