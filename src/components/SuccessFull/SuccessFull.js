import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import img from '../../assests/done.gif'
import CancelIcon from '@mui/icons-material/Cancel';
import './SuccessFull.css'
import { QuestionContext } from "../../hook/Context";
const SuccessFull = ({ open, handleClose }) => {
    const [data, setData] = useState({ correct: 0, score: 0, attempt: 0 })
    const { state, dispatch } = useContext(QuestionContext)

    const handleCancel = () => {
        handleClose(false)
        dispatch({ type: 'RESET' })
    }
    const CalculateData = () => {
        let correct = 0;
        let score = 0;
        let attempt = 0
        for (let i = 0; i < state.length; i++) {
            if (state[i].userAnswer === state[i].answer) {
                correct += 1;
                score += 25
            }
            if (state[i].userAnswer !== '') {
                attempt += 1
            }
        }
        setData({ ...data, correct: correct, score: score, attempt: attempt })
    }

    useEffect(() => {
        CalculateData();
    }, [state])

    return <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal_box">
                <div className="modal_box_container">
                    <CancelIcon className="cancel_btn" onClick={handleCancel} />
                    <div className="modal_box_header">
                        <img src={img} alt="done image" className="done_img" />
                        <h1>SuccessFully Submitted</h1>
                    </div>
                    <div className="modal_box_info">
                        <div><p>Question Asked:</p> <p className="value">{state.length}</p></div>
                        <div><p>Question Attempt:</p> <p className="value">{data?.attempt}</p></div>
                        <div><p>Question Correct:</p> <p className="value">{data?.correct}</p></div>
                        <div className="score_text">
                            <p>Your Score        : </p> <p>{data?.score}%</p>
                        </div>
                    </div>
                    <button className="submit_btn done_btn" onClick={handleCancel}>Done</button>
                </div>
            </Box>
        </Modal>
    </div>;
};

export default SuccessFull;
