import React from 'react'
import FlashCard from './FlashCard'
import styles from '../styles/cardslist.module.css'


function CardsList({data}) {
  return (
    <div className={styles.container}>
      {
      data.map(quiz => <FlashCard quiz={quiz} key={quiz.id}/>)
    }
    </div>
  )
}


export default CardsList