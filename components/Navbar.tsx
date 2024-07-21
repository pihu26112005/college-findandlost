"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { SidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';
import MobileNav from './MobileNav';

const Navbar = () => {
    const pathname = usePathname();
  return (
    <nav className="border-b border-white border-opacity-50 shadow-bottom flex flex-between fixed z-40 w-[65%] max-sm:w-[100%] bg-black-1 px-6 py-4 lg:px-10">
      <Link
        href="/"
        className=' flex items-center gap-1'
      >
        <Image
          src='/icons/logo.svg'
          alt='logo'
          width={35}
          height={35}
          className='max-sm:size-10'
        />
        <p className='text-white font-extrabold max-sm:hidden'>Lost-Found</p>
      </Link>
      <div className="flex ">
            {
                SidebarLinks.map((link, index) => {
                const isActive = pathname === link.route || pathname.endsWith(link.route);
                return (
                    <Link 
                        key={index} 
                        href={link.route}
                         className={cn('flex items-center gap-4 p-4 justify-start rounded-lg font-semibold text-white' , {
                            'text-blue-400': isActive
                         })}
                    >
                        <p className='text-lg max-lg:hidden'>{link.label}</p>
                    </Link>
                )
            } )}
        </div>
      <div className="flex gap-5 flex-between">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar