'use client'

import React, { useState } from 'react'

export function UploadForm({emailRef}) {
  const [file, setFile] = useState()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      console.log("Email:", emailRef?.current?.value)
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/documents/upload?email=${emailRef?.current?.value}`, {
        method: 'POST',
        body: data
      })
      console.log(res)
      // handle the error
    //   if (!res.ok) throw new Error(await res.text())
    } catch (e) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
        <label htmlFor='file' className='rounded border-2 border-[#0d6efd] p-2 text-xl'>+</label>
      <input
        type="file"
        name="file"
        id = "file"
        onChange={(e) => setFile(e.target.files?.[0])}
        hidden
      />
      <input type="submit" value="OK" className='rounded border-2 border-[#b02a37] p-2 text-xl' style={{visibility: file ? 'visible' : 'hidden'}}/>
    </form>
  )
}