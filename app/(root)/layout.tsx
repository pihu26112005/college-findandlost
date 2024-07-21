import Navbar from '@/components/Navbar'
import React, { ReactNode } from 'react'

const HomeLayout = ({children}: {children:ReactNode}) => {
  return (
    <main className='relative md:max-w-[65%]  m-auto'>
        <Navbar />
        <div className="flex">
            {/* <Sidebar /> */}
            <section className="flex flex-1 flex-col  pb-8 pt-28 in-h-screen max-md:pb-14 ">
                <div className=" m-auto w-[80%]">
                {children}
                </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout