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
  }, [data])

  return (
    <div className={styles.container}>
      <Head>
        <title>Flash cards app</title>
      </Head>
        <HomepageNavBar option='Login'/>
      <h4 className={styles.welcome}>Make a guess before flipping</h4>
      <CardsList data={data}/>
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
