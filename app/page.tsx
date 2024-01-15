"use client"
import Post from './components/Post'
import Get from './components/Get'
import { useState } from 'react'

export default function Home() {
  const [visibility,setvisibility] = useState(false)
  return (
    <main >
      <div className='w-full flex items-center justify-center mt-3  text-white'>
      <button onClick={()=>setvisibility(!visibility)} className='bg-black px-5 py-2 rounded-full'>{visibility?"Hide":"Add Event"}</button>
      </div>
      {visibility?<Post/>:""}
      <Get/>
    </main>
  )
}
