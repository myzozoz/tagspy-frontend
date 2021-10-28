import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/TagForm.module.css'

const TAG_MAX_LENGTH = 30
const MAX_TAGS = 5





export const TagForm = () => {
  const [tagList, setTagList] = useState([''])
  const router = useRouter()

  const changeTagValue = (value: string, i: number): void => {
    const newTags = [...tagList]
    if (value.length <= TAG_MAX_LENGTH)
      newTags[i] = value
    
    setTagList(newTags)
  }

  const changeTagAmount = (value: number): void => {
    const newTags = [...tagList]
    if ( value > 0 && tagList.length < MAX_TAGS)
      newTags.push('')
    else if (value < 0 && tagList.length > 1)
      newTags.pop()
    setTagList(newTags)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const paramList = tagList.filter(tag => tag !== '')
    const params = paramList.join(',')
    router.push({
      pathname: `/results`,
      query: {
        tags: params
      }
    })
  }

  return (
    <div>
      <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
        Enter tags:
        { tagList.map((tag, i) =>
          <input
            key={i}
            type="text"
            name="tag-input"
            value={tag}
            onChange={(e) => changeTagValue(e.target.value, i)} />
          )}
        <div>
          <button type="button" onClick={() => changeTagAmount(1)}>
            Add tag
          </button>
          <button type="button" onClick={() => changeTagAmount(-1)}>
            Remove tag
          </button>
        </div>
        <input type="submit" />
      </form>
      
    </div>
  )
}