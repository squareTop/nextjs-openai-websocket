'use client'

import React, { useState } from 'react'

export function UploadForm({emailRef, ...props}) {
  const [files, setFiles] = useState()

  const onSubmit = async (e) => {
    e.preventDefault()
    alert("AAA")
    if (!files || !files.length || files.length == 0) return
    console.log(files)

    try {
      const data = new FormData()
      for (let i = 0; i < files.length; ++i)
        data.append(`files`, files[i])

      alert(emailRef?.current?.value)

      console.log("Email:", emailRef?.current?.value)
      const res = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}/documents/upload?email=${emailRef?.current?.value}`, {
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
    <form onSubmit={onSubmit} {...props}>
        <label htmlFor='file' className='rounded border-2 border-[#0d6efd] p-2 text-xl'>+</label>
      <input
        type="file"
        name="file"
        id = "file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        hidden
      />
      <input type="submit" value="OK" className='rounded border-2 border-[#b02a37] p-2 text-xl' style={{visibility: files?.length > 0 ? 'visible' : 'hidden'}}/>
    </form>
  )
}