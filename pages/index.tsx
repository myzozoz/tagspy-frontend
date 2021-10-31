import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { TagForm } from '../components/TagForm'
import { GetStaticProps } from 'next'

type Props = {
  tags: string[]
}

const Home: NextPage<Props> = ({tags}) =>
{
  return (
    <div className={styles.container}>
      <Head>
        <title>TagSpy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to TagSpy!
        </h1>

        <div>
          <p className={styles.description}>TagSpy is a service, that lets you find keywords in Steam reviews. The app works by taking Steam tags as input (field below), searching for games with those tags and then performing analysis for a portion of the most helpful reviews of those games.</p>
        </div>

        <TagForm tags={tags}/>

      </main>

      
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const url = process.env.TAGSPY_API_URL + "/tags"
  const res = await fetch(url)
  const data = await res.text()

  
  return {
    props:{
      tags: JSON.parse(data)
    }
  }
}

export default Home
