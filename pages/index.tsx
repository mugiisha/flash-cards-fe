import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomepageNavBar from '../components/HomepageNavBar'
import CardsList from '../components/CardsList'
import { gql } from '@apollo/client';
import { useSelector ,useDispatch} from 'react-redux'
import { graphqlClient } from '../apollo'
import { getAllQuizes } from '../utils/querries'
import { getQuizes } from '../store/features/quizes'
import { useEffect } from 'react'

//@ts-ignore
const Home: NextPage = ({}) => {
  const dispatch=useDispatch()

 
  //@ts-ignore
  const data = useSelector(state => state?.quizes?.quizes)

  //@ts-ignore
  useEffect(() => {
    const getQuizesfn = async() => {
      const {data}= await graphqlClient.query({
        query:getAllQuizes
      })
      dispatch(getQuizes(data.quizes))
    }
    getQuizesfn()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Flash cards app</title>
      </Head>
        <HomepageNavBar option='login'/>
        <div className={styles.div}>
          <h4 className={styles.welcome}><span className={styles.span}>Make a guess 🤔</span> <br /> before a flip 😉</h4>
        </div>
        {data.length > 0 ? <CardsList data={data}/> : <h3 className={styles.wait}>Wait a sec...</h3>}
    </div>
  )
}

export async function getServerSideProps() {
  const client = graphqlClient
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


export default Home
