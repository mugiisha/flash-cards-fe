import React ,{useEffect}from 'react'
import DashboardCard from './DashboardCard'
import styles from '../styles/cardslist.module.css'

function DashboardCardList({setUpdateMode,data}) {
 let currentUser
 useEffect(() => {
   if(typeof window !== 'undefined'){
     currentUser = localStorage.getItem('user') 
   }
 },[currentUser])
  
  const created = data.quizes.filter(item => item.postedBy.name === currentUser)
  const numberOfCreated = created.length
  return ( 
    <>
      <div className={styles.container}>
        {data.quizes.map(item => <DashboardCard setUpdateMode={setUpdateMode} item={item} key={item.id}/>)}
      </div>
      
    </>
  )
}

export default DashboardCardList




// {numberOfCreated.length > 0 ?
//   <div className={styles.container}>
//     {data.quizes.map(item => <DashboardCard setUpdateMode={setUpdateMode} item={item} key={item.id}/>)}
//   </div> : 
//   <h5>you haven't created a question yet! the created ones will appear here</h5> }