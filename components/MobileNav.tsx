"use client";

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { SidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'


const MobileNav = () => {
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Image
                    src='/icons/hamburger.svg'
                    alt='menu'
                    width={35}
                    height={35}
                    className='sm:hidden'
                />
            </SheetTrigger>
            <SheetContent side='left' className='border-none bg-black-2'>
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
                    <p className='text-white font-extrabold '>Lost-Found</p>
                </Link>

                <div className="flex flex-col justify-between overflow-y-auto h-[calc(100vh-72px)]">
                    <SheetClose asChild>
                        <section className="flex flex-col gap-6 h-full pt-16">
                            {
                                SidebarLinks.map((link, index) => {
                                    const isActive = pathname === link.route || pathname.endsWith(link.route);
                                    return (
                                       <SheetClose asChild key={index} >
                                         <Link
                                            key={index}
                                            href={link.route}
                                            className={cn('flex items-center gap-4 p-4 justify-start rounded-lg font-semibold', {
                                                'bg-blue-1': isActive
                                            })}
                                        >
                                            <Image
                                                src={link.imageUrl}
                                                alt={link.label}
                                                width={24}
                                                height={24}
                                            />
                                            <p className='text-lg text-white'>{link.label}</p>
                                        </Link>
                                       </SheetClose>
                                    )
                                })}
                        </section>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>

    )
}

export default MobileNav