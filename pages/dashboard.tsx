import React, {useState,useEffect} from 'react'
import HomepageNavBar from '../components/HomepageNavBar'
import styles from '../styles/dashboard.module.css'
import DashboardCardList from '../components/DashboardCardList'
import { graphqlClient} from '../apollo'
import {useMutation,gql,useQuery} from '@apollo/client'
import type { NextPage } from 'next'
import { useSelector,useDispatch } from 'react-redux'
import { getQuizes,updateQuiz,createQuiz,deleteQuiz } from '../store/features/quizes'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {createQuizql,deleteQuizql,updateQMutation,getAllQuizes} from "../utils/querries"

const notify = (toastMsg) => toast(toastMsg)






//@ts-ignore
const Dashboard: NextPage =() => {
  const dispatch = useDispatch()
  ///@ts-ignore

  const getQuizesfn = async() => {
    const {data}= await graphqlClient.query({
      query:getAllQuizes
    })
    dispatch(getQuizes(data.quizes))
  }
 

  const[updateMode,setUpdateMode] = useState(false)
  const[token,setToken] = useState('')
  const [currentQ,setCurrentQ] = useState({
    updateID:'',
    question:'',
    answer:''
  })



  const [creater] = useMutation(createQuizql,{
    context:{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }
    }
  )

  const [updater] = useMutation(updateQMutation)
  //@ts-ignore
  const [deleter,{info}] = useMutation(deleteQuizql)

  const {question,answer,updateID} = currentQ 

    const handleUpdate=async(e) => {
      e.preventDefault()

      await updater({variables:{updateQuestion2:question,updateId:updateID,updateAnswer2:answer}})
      .then(res => {
        dispatch(updateQuiz({id:updateID,data:res.data}))
        setUpdateMode(false)
        notify('question updated successfully')
    }).catch(e => notify(e.message))
  }

  const handleCreate=async(e) => {
    e.preventDefault()
    if(!(question && answer)){
      notify('fill both question and answer')
      return
    }

    await creater({variables:{question:question,answer:answer}})
    .then(res => {
      dispatch(createQuiz(res.data))
      notify('Question created successfully')
  }).catch(e => notify(e.message))
}

    const handleDelete=async(e) => {
      e.preventDefault()

      await deleter({variables:{deleteId:updateID}})
      .then(res => {
        dispatch(deleteQuiz(updateID))
        setUpdateMode(false)
        notify('question deleted successfully')
    }).catch(e => notify(e.message))
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'))
    getQuizesfn()
    //@ts-ignore
  },[token])


  return (
    <>
        <HomepageNavBar option='logout'/>
        <ToastContainer />
        <div className={styles.main}>
            <div className={styles.form}>
                {
                    updateMode ?
                    <form action="">
                    <label htmlFor="question">question:</label><br />
                    <input className={styles.input} type="text" onChange={(e) => setCurrentQ({...currentQ,question:e.target.value})} name='question' defaultValue={currentQ?.question}/><br /><br />
                    <label htmlFor="answer">answer:</label><br />
                    <input className={styles.input} type="text" onChange={(e) => setCurrentQ({...currentQ,answer:e.target.value})} name='answer' defaultValue={currentQ?.answer}/><br /><br />
                    <input className={styles.button} onClick={handleUpdate} type="submit" value='update'/>
                    <input className={styles.deleteBtn} onClick={handleDelete} type="submit" value='delete'/>
                </form>  :
                    <form action="" onSubmit={handleCreate}>
                    <input className={styles.input} type="text" onChange={(e) => setCurrentQ({...currentQ,question:e.target.value})} placeholder='Enter question'/><br /><br />
                    <input className={styles.input} type="text" onChange={(e) => setCurrentQ({...currentQ,answer:e.target.value})} placeholder='Enter answer'/><br /><br />
                    <input className={styles.button} type="submit" value='create'/>
                </form>

                }
               
            </div>
            <div>
            <hr />
                <DashboardCardList setUpdateMode={setUpdateMode} setCurrentQ={setCurrentQ}/>
            </div>
        </div>
    </>
  )
}



export async function getServerSideProps() {
  const client = graphqlClient
    const {data}= await client.query({
      query:getAllQuizes
    })
  
    return {
      props: {
        quizes:data
      }
    }
  }
  

export default Dashboard