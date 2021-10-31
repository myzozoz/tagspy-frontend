import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import styles from '../styles/results.module.css'


import { TagCloud } from 'react-tagcloud'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Props = {
  url: string,
}

const ResultsPage: NextPage<Props> = ({url}) => {
  const {data, error} = useSWR(url, fetcher)
  const keywords = data && data.top_keywords

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top Keywords:</h1>
      { error && <p>An error happened while loading, we&apos;re sorry :(</p>}
      { !keywords ? <p>loading...</p>: <TagCloud
        minSize={12}
        maxSize={60}
        tags={keywords}
        onClick={(tag: any) => console.log(`'${tag.value}' was clicked!`)}/>}
      <Link href='/' passHref>
        <button className={styles.back_button}>Go Back</button>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context)  => {
  const url = process.env.TAGSPY_API_URL + "/summary?tags=" + context.query.tags

  return {
    props: {
      url
    }, // will be passed to the page component as props
  }
}

export default ResultsPage