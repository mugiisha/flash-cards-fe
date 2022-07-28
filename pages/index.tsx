import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomepageNavBar from '../components/HomepageNavBar'
import CardsList from '../components/CardsList'
import { gql } from '@apollo/client';
import { client } from '../apollo'

//@ts-ignore
const Home: NextPage = ({data}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Flash cards app</title>
      </Head>
        <HomepageNavBar option='login'/>
      <h4 className={styles.welcome}>Make a guess before flipping</h4>
      <CardsList data={data}/>
    </div>
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


export default Home
