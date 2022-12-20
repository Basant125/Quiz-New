
import React, { createContext } from 'react'
import { Question } from '../data'
export const QuestionContext = createContext()

function countReducer(state, action) {
    switch (action.type) {
        case 'ADD_ANSWER': {
            return [...state.map(item => item.id === action.payload.id ? { ...item, userAnswer: action.payload.data, checked: true } : item)]
        }
        case 'RESET': {
            return [...Question]
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function CountProvider({ children }) {
    const [state, dispatch] = React.useReducer(countReducer, Question)
    const value = { state, dispatch }
    return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>
}

export { CountProvider }