import React from 'react'
import FlashCard from './FlashCard'
import styles from '../styles/cardslist.module.css'


//@ts-ignore
function CardsList({data}) {
  return (
    <div className={styles.container}>
      {//@ts-ignore
      data.quizes.map(quiz => <FlashCard quiz={quiz} key={quiz.id}/>)
      }
    </div>
  )
}


export default CardsList