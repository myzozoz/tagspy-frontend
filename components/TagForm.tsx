import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/TagForm.module.css'
import Select from 'react-select'

const TAG_MAX_LENGTH = 30
const MAX_TAGS = 5


type Props = {
  tags: string[]
}


export const TagForm = ({tags}: Props) => {
  const [tagList, setTagList] = useState([''])
  const router = useRouter()
  const tagOptions = tags.sort().map((t: string): {value: string, label: string} => ({ value: t.toLowerCase(), label: t}))

  const handleChange = (newValue: any) => {
    setTagList(newValue.map((v: any) => v.label))
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
    <div className={styles.container}>
      <Select className={styles.select}
        options={tagOptions}
        isMulti={true}
        autoFocus={true}
        onChange={handleChange}
      />
      <input className={styles.submit_button} type="submit" onClick={handleSubmit}/>
      
    </div>
  )
}