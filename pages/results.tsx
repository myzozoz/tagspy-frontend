import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'

type Props = {
  results: any,
}

const ResultsPage: NextPage<Props> = ({results}) => {
  console.log(results)
  return (
    <div>results: </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context)  => {
  const res = await fetch('https://tagspy-service.herokuapp.com/api/games?tags='+context.query.tags)
  const data = await res.text()

  return {
    props: {
      results: JSON.parse(data)
    }, // will be passed to the page component as props
  }
}

export default ResultsPage