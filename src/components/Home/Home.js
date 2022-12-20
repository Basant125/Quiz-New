import React, { useState } from "react";
import AnswerContainer from "../AnswerContainer/AnswerContainer";
import QuizContainer from "../QuizContainer/QuizContainer";
import './Home.css'
const Home = () => {
    const [step, setStep] = useState(0)
    const setNumber = (value) => {
        setStep(prev => prev + value)
    }
    return <div className="home">
        <header className="App_header">
            <h2>QUIZ</h2>
            <div div className="progress_bar" >
            </div>
        </header>

        <main className='quiz'>
            <div className="background_circle"></div>
            <AnswerContainer />
            <QuizContainer setNumber={setNumber} />
        </main>
    </div>;
};

export default Home;
