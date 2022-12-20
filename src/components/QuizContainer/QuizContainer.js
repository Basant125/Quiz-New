import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { pink } from '@mui/material/colors';
import React, { useContext, useEffect, useState } from "react";
import { Question } from '../../data'
import { QuestionContext } from "../../hook/Context";
import SuccessFull from "../SuccessFull/SuccessFull";
import './QuizContainer.css'
const QuizContainer = ({ setNumber }) => {
    const [value, setValue] = useState('');
    const [count, setCount] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [question, setQuestion] = useState(Question[count])
    const { state, dispatch } = useContext(QuestionContext);
    const handleOpen = (check) => setOpen(check);
    const handleClose = (check) => setOpen(check);

    const handleRadioChange = (e) => {
        setValue(e.target.value)
        dispatch({ type: "ADD_ANSWER", payload: { id: question.id, data: e.target.value } });
    }

    const handleClick = (value) => {
        setCount(prev => prev + value);
        setNumber(value);
    }

    const updateInstant = (value) => {
        const question = state[value]
        setQuestion(question)
    }

    const handleSubmit = () => {
        setOpen(true);
        setValue('');
        setCount(0);
    }

    useEffect(() => {
        updateInstant(count)
    }, [count, state])

    return <section className='quiz_container'>
        <div className="quiz_questions">
            <h2 className="question_heading">{count + 1}. {question.question}</h2>
            <RadioGroup
                name={question.question}
                value={value}
                onChange={handleRadioChange}
            >
                {
                    question.options?.map((option) =>
                        <div className="checkboxes" key={option}>
                            <FormControlLabel value={option} control={<Radio sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }} />} label={option} checked={option === question.userAnswer ? true : false} className={option === question.userAnswer ? 'select_radio' : ''} />
                        </div>
                    )
                }
            </RadioGroup>
        </div>
        <div className="btn_group">
            <button onClick={() => handleClick(-1)} className={count === 0 ? 'btn_disable' : ''}>Prev</button>
            <button onClick={() => handleClick(1)} className={Question.length - 1 === count ? 'btn_disable' : ''}>Next</button>
        </div>
        <div className="submitBox" style={{ display: Question.length - 1 === count ? " block" : 'none' }}>
            <button className="submit_btn border_color" onClick={handleSubmit}>Submit</button>
        </div>
        <SuccessFull open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </section>;
};

export default QuizContainer;
