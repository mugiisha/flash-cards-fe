import React,{useState} from 'react'
import HomepageNavBar from '../components/HomepageNavBar'
import styles from '../styles/login.module.css'
import {useMutation,gql} from '@apollo/client'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

//@ts-ignore
const notify = (toastMsg) => toast(toastMsg)

const loginMutation = gql`
  mutation login($loginEmail2: String!, $loginPassword2: String!){
  login(email: $loginEmail2, password: $loginPassword2) {
    token
    user {
      name
    }
  }
}
`



function login() {
  const [inputs,setInputs] = useState({
    email:'',
    password:''
  })

  const [logger,{data,loading,error}] = useMutation(loginMutation)
//@ts-ignore
  const handleLogin = async(e) => {
    e.preventDefault()
    console.log(inputs)
  logger({variables:{loginEmail2:inputs.email,loginPassword2:inputs.password}})
  .then(res => {
    localStorage.setItem('token',res.data.login.token )
    localStorage.setItem('user',res.data.login.user.name )
    location.href ='/dashboard'
    console.log(res)
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

export default login