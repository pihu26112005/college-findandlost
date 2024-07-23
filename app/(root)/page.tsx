"use client";
import { Audio } from 'react-loader-spinner'
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from 'react'
import ShineBorder from "@/components/magicui/shine-border";
import Link from 'next/link';
import GradualSpacing from '@/components/magicui/gradual-spacing';
import Image from "next/image";
import Loader from '@/components/Loader';


const HomePage = () => {
  const { user } = useUser();
  const [queryData, setQueryData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/allQuery`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQueryData(data);
        console.log("data", data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);
  return (
    <>
    {isLoading ? 
      (<Loader />) : 
      <>
      <GradualSpacing
        className="md:mt-20 mt-10 mb-16 max-w-[60%] text-white font-display text-center text-3xl font-bold tracking-[-0.1em] md:text-7xl md:leading-[5rem]"
        text={`Welcome ${user?.firstName?.split(" ")[0]}`}
      />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
        <Link href='/newFindQuery'>
          <ShineBorder
            className="relative flex h-[50px]  m-auto flex-col items-center justify-center overflow-hidden  bg-background "
            color={["#350da3", "#cc0e54", "#FFBE7B"]}
            borderWidth={1}
          >
            <span className=" text-white pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center  font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              <p>Create a New Find Query</p>
            </span>
          </ShineBorder>
        </Link>

        <Link href='/newLostQuery'>
          <ShineBorder
            className="relative flex h-[50px]  m-auto flex-col items-center justify-center overflow-hidden  bg-background "
            color={["#350da3", "#cc0e54", "#FFBE7B"]}
            borderWidth={1}
          >
            <span className=" text-white pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center  font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              <p>Create a New Lost Query</p>
            </span>
          </ShineBorder>
        </Link>
      </div>

    </>
    }
    </>
  )
}

export default HomePage
