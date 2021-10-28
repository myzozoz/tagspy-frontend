import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { TagCloud } from 'react-tagcloud'

type Props = {
  results: any,
}

const ResultsPage: NextPage<Props> = ({results}) => {
  console.log(results)
  const data = results.top_keywords || []

  return (
    <div>
      <TagCloud
        minSize={12}
        maxSize={100}
        tags={data}
        onClick={(tag: any) => console.log(`'${tag.value}' was clicked!`)}/>
      <Link href='/'>
        <button>Go Back</button>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context)  => {
  const url_base = process.env.NODE_ENV === 'development' ? "http://localhost:5000/api/games?tags=" : "https://tagspy-service.herokuapp.com/api/games?tags="
  const res = await fetch(url_base + context.query.tags)
  const data = await res.text()

  return {
    props: {
      results: JSON.parse(data)
    }, // will be passed to the page component as props
  }
}

export default ResultsPage