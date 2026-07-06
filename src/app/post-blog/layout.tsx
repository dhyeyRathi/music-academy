import React from 'react'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full min-h-screen bg-warm-bg text-warm-text-primary">
      {children}
    </div>
  )
}

export default RootLayout
