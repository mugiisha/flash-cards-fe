import React ,{useEffect,useState}from 'react'
import DashboardCard from './DashboardCard'
import styles from '../styles/cardslist.module.css'
import {useSelector} from 'react-redux'

function DashboardCardList({setUpdateMode,setCurrentQ}) {
  const data= useSelector(state => state?.quizes?.quizes)
 const [currentUser,setCurrentUser] = useState('')
console.log(data)
 useEffect(() => {
     setCurrentUser(localStorage.getItem('user'))
 },[currentUser])
  
  const created = data?.filter(item => item.postedBy?.name === currentUser)
  const numberOfCreated = created?.length
  return ( 
      <>
          {numberOfCreated ?
          <>
           <h5 className={styles.h5}>here are your questions👌​</h5>
           <div  className={styles.container}>
           {created?.map(item => <DashboardCard setUpdateMode={setUpdateMode} item={item} key={item.id} setCurrentQ={setCurrentQ}/>)}
           </div>
          </>
           : 
           <h5 className={styles.h5}>you haven&apos;t created a question yet! the created ones will appear here👇​</h5>
           }      
      </>
  )
}

export default DashboardCardList


{/* <div className={styles.container}>
        {numberOfCreated ? 
        created?.map(item => <DashboardCard setUpdateMode={setUpdateMode} item={item} key={item.id}/>)
        :
          <h5>you haven't created a question yet! the created ones will appear here</h5>
        }
        
      </div> */}