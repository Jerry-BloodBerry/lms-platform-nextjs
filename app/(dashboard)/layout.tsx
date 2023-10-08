import React from 'react'
import Sidebar from './_components/sidebar'
import Navbar from './_components/navbar'

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className='h-full'>
      <nav className='h-[80px] md:pl-56 fixed inset-y-0 w-full z-50'>
        <Navbar />
      </nav>
      <aside className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
        <Sidebar />
      </aside>
      <main className='md:pl-56 h-full'>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout