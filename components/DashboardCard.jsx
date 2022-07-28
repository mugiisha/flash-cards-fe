import React from 'react'
import styles from '../styles/dashboardcard.module.css'

function DashboardCard({setUpdateMode,item}) {
  return (
    <div className={styles.card}>
         <div className={''}>
                <h5 className={styles.h5}>question</h5>
                <h4>{item.question}</h4>
                <button className={styles.button} onClick={() => setUpdateMode(mode => !mode)}>view/modify</button>
            </div>
    </div>
  )
}

export default DashboardCard