import React, { useContext, useEffect, useState } from "react";
import './AnswerContainer.css'
import success from '../../assests/success.gif'
import { QuestionContext } from "../../hook/Context";
const AnswerContainer = () => {
    const [answer, setAnswer] = useState([])
    const { state } = useContext(QuestionContext);
    const getUserAnswer = answer.filter(item => item.userAnswer !== '');
    console.log(getUserAnswer, "user answer")

    const SetAnswer = (value) => {
        setAnswer(value)
    }

    useEffect(() => {
        SetAnswer(state);
        console.log(answer, "length")
    }, [state])
    return <section className='answer_container'>
        <div className="answer_header">
            <img src={success} alt="success" className="success_img" />
            <h4>Review answer here</h4>
        </div>
        <div className="answer_body">
            {
                (answer.length > 0 && getUserAnswer.length > 0) ? (state.map((item, index) => {
                    if (item.userAnswer !== '') {
                        return <div className="answer_box" key={item.id}>
                            <h4>{index + 1}</h4>
                            <p className="answer_text">{item.userAnswer ? item.userAnswer : ''}</p>
                        </div>
                    } else { return; }
                })) : <h4 className="no_answer">No Answer Here!</h4>
            }
        </div>
    </section>
};

export default AnswerContainer;
