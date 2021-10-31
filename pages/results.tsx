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
      <Link href='/' passHref>
        <button>Go Back</button>
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context)  => {
  const url = process.env.TAGSPY_API_URL + "/summary?tags=" + context.query.tags
  const res = await fetch(url)
  const data = await res.text()

  return {
    props: {
      results: JSON.parse(data)
    }, // will be passed to the page component as props
  }
}

export default ResultsPage