'use client'
import React from 'react'
import { useEffect,useState} from 'react'
import PromptCard from './PromptCard'
import Link from 'next/link'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  )
}

 

function Feed() {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  
  useEffect  (() => {
    const fetchpost = async () => { 
      const res = await fetch('api/prompt')
      const data = await res.json()
      setPosts(data)
    }
    fetchpost()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center flex-col'>
        <input
        type='text'
        placeholder='search your desired prompt'
        value={searchText}
        onChange={() => {}}
        required
        className='search_input peer'/>
        <p className='desc '>OR</p>
        <Link href='/generate-with-ai'
         className='w-2/5 my-5 mx-1 black_btn'>
          Generate with AI
        </Link>

      </form>
      <PromptCardList
      data = {posts}
      handleTagClick={() => {}}
      />

    </section>
  )
}

export default Feed