import React from 'react'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-flare-gradient w-full h-full animate-clock-it'>
      {children}
    </div>
  )
}

export default RootLayout
