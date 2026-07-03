'use client'

import React, { useEffect } from 'react'

const page = () => {
  useEffect(() => {
    throw new Error('Deliberate error on about page for testing error boundary!')
  }, [])
  
  return (
    <div>
      
    </div>
  )
}

export default page
