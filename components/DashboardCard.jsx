import React from 'react'
import styles from '../styles/dashboardcard.module.css'

function DashboardCard({setUpdateMode,item,setCurrentQ}) {
  const handleUpdate = async(item) =>{
    await setCurrentQ({
      updateID:String(item?.id),
      question:item?.question,
      answer:item?.answer
    })
    console.log(item)
    setUpdateMode(mode => !mode)
  }
  return (
    <div className={styles.card}>
         <div className={''}>
                <h5 className={styles.h5}>question</h5>
                <h4>{item.question}</h4>
                <button className={styles.button} onClick={() => handleUpdate(item)}>view/modify</button>
            </div>
    </div>
  )
}

export default DashboardCard