import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'react-bootstrap'

export default function ButtonLink({link, ...props}) {
    const router = useRouter()
  return (
    <Button onClick={()=> router.push(link) } {...props}/>
  )
}