import React from 'react'
import styles from '../styles/homepagenavbar.module.css'
import Link from 'next/link'

const HomepageNavBar = ({option})=> {
  return (
        <div id={styles.nav}>
            <Link href='/'>
              <h4 className={styles.h4}>FLASHY</h4>
            </Link>
            <Link href={`/${option !== 'logout' ? option : 'Login'}`}>
              <button className={styles.button}>{option}</button>
            </Link>
        </div>
  )
}



export default HomepageNavBar