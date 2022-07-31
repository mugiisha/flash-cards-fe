import React ,{useState}from 'react'
import styles from '../styles/flashcard.module.css'

const FlashCard = ({quiz}) => {
  return (
    <div className={styles.card}>
            <div className={styles.front}>
                <h5>question</h5>
                <h4>{quiz?.question}</h4>
                <p>created by {quiz?.postedBy.name}</p>
            </div>

            <div className={styles.back}>
                <h5>Answer</h5>
                <h4>{quiz?.answer}</h4>
            </div>
    </div>
  )
}

export default FlashCard