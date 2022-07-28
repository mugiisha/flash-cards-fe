import React,{useState} from 'react'
import HomepageNavBar from '../components/HomepageNavBar'
import styles from '../styles/signup.module.css'
import {useMutation,gql} from '@apollo/client'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const signupMutation = gql`
  mutation signup($email: String!, $password: String!, $name: String!){
  signup(email: $email, password: $password, name: $name) {
    user {
      email
      name
    }
    token
  }
}
`//@ts-ignore
const notify = (toastMsg) => toast(toastMsg)

function Signup() {
  const [inputs,setInputs] = useState({
    name:'',
    email:'',
    password:''
  })
  const [logger,{data,loading,error}] = useMutation(signupMutation)
  //@ts-ignore
  const handleSignUp = (e) => {
    e.preventDefault()
    e.preventDefault()
    console.log(inputs)
  logger({variables:{email:inputs.email,password:inputs.password,name:inputs.name}})
  .then(res => {
    localStorage.setItem('token',res.data.signup.token )
    localStorage.setItem('user',res.data.signup.user.name )
    location.href ='/dashboard'
    console.log(res)
  })
  .catch(e =>{
    if(e.message.includes('Invalid')){
      notify('user with this email exists try another one')
      return
    }
    notify(e.message)
  })
    
  }

  return (
    <>
        <HomepageNavBar option='Login'/>
        <ToastContainer />
        <div className={styles.container}>
            <div className={styles.main}>
                <form action="">
                    <input className={styles.input} type="text" onChange={(e) => setInputs({...inputs,name: e.target.value})} placeholder='Enter your name'/><br /><br />
                    <input className={styles.input} type="email" onChange={(e) => setInputs({...inputs,email: e.target.value})} placeholder='Enter your email'/><br /><br />
                    <input className={styles.input} type="password" onChange={(e) => setInputs({...inputs,password: e.target.value})} placeholder='Enter your password'/><br /><br />
                    <input className={styles.login} type="submit" onClick={handleSignUp} value='signup'/>
                </form>

            </div>
        </div>
    </>
  )
}

export default Signup