import React, {useState} from 'react'
import HomepageNavBar from '../components/HomepageNavBar'
import styles from '../styles/dashboard.module.css'
import DashboardCardList from '../components/DashboardCardList'
import { client } from '../apollo'
import { gql } from '@apollo/client';


//@ts-ignore
function dashboard({data}) {
    const[updateMode,setUpdateMode] = useState(false)
  return (
    <>
        <HomepageNavBar option='logout'/>
        <div className={styles.main}>
            <div className={styles.form}>
                {
                    updateMode ?
                    <form action="">
                    <label htmlFor="question">question:</label><br />
                    <input className={styles.input} type="text" name='question' defaultValue='questioon'/><br /><br />
                    <label htmlFor="answer">answer:</label><br />
                    <input className={styles.input} type="text" name='answer' defaultValue='But i no get the answer'/><br /><br />
                    <input className={styles.button} type="submit" value='update'/>
                    <input className={styles.deleteBtn} type="submit" value='delete'/>
                </form>  :
                    <form action="">
                    <input className={styles.input} type="text" placeholder='Enter question'/><br /><br />
                    <input className={styles.input} type="text" placeholder='Enter answer'/><br /><br />
                    <input className={styles.button} type="submit" value='create'/>
                </form>

                }
               
            </div>
            <div>
                <DashboardCardList setUpdateMode={setUpdateMode} data={data}/>
            </div>
        </div>
    </>
  )
}



export async function getStaticProps() {
    const {data}= await client.query({
      query: gql`
        query getAllQuizes{
          quizes {
          answer
          question
          id
          postedBy {
            name
          }
    }
  }
      `
    })
  
    return {
      props: {
        data
      }
    }
  }
  

export default dashboard