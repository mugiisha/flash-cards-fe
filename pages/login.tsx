import React,{useState} from 'react'
import HomepageNavBar from '../components/HomepageNavBar'
import styles from '../styles/login.module.css'
import {useMutation,gql} from '@apollo/client'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import type { NextPage } from 'next'


const notify = (toastMsg) => toast(toastMsg)

const loginMutation = gql`
  mutation Login($loginEmail2: String!, $loginPassword2: String!){
  login(email: $loginEmail2, password: $loginPassword2) {
    token
    user {
      name
    }
  }
}
`



const Login: NextPage =() => {
  const [inputs,setInputs] = useState({
    email:'',
    password:''
  })

  const [logger,{data,loading,error}] = useMutation(loginMutation)

  const handleLogin = async(e) => {
    e.preventDefault()
    if(!(inputs.email && inputs.password)){
      notify('enter your credentials')
      return
    }

  logger({variables:{loginEmail2:inputs.email,loginPassword2:inputs.password}})
  .then(res => {
    localStorage.setItem('token',res.data.login.token )
    localStorage.setItem('user',res.data.login.user.name )
    location.href ='/dashboard'
  })
  .catch(e => notify(e.message))
  }

  return (
    <>
        <HomepageNavBar option='signup'/>
        <ToastContainer />
        <div className={styles.container}>
            <div className={styles.main}>
                <form action="">
                    <input className={styles.input} onChange={(e) => setInputs({...inputs,email: e.target.value})} type="email" placeholder='Enter your email' required/><br /><br />
                    <input className={styles.input} onChange={(e) => setInputs({...inputs,password: e.target.value})} type="password" placeholder='Enter your password' required/><br /><br />
                    <input className={styles.login} type="submit" onClick={handleLogin} value='login'/>
                </form>

            </div>
        </div>
    </>
  )
}

export default Login