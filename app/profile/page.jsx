"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import  Profile  from '@components/Profile'


const MyProfile= () => {


   
    const {data : session} = useSession()
    const [posts, setPosts] = useState([])
    console.log(session?.user.id);
    const handleEdit = () => {

    }
    const handleDelete = async () => {

    }
    useEffect  (() => {
        const fetchpost = async () => { 
          const res = await fetch(`api/users/${session?.user.id}/posts`)
          const data = await res.json()
          setPosts(data)
        }
        if(session?.user.id) fetchpost()
      }, [])

  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
  )
}

export default MyProfile





