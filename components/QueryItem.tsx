import React, { use } from 'react'
import TypingAnimation from "@/components/magicui/typing-animation";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface QueryItemProps {
  name: string;
  title: string;
  description: string;
  image: string;
  type: string;
  queryID: string;
  tags: [];
  dateLost?: string;
}

const QueryItem = ({ name, title, description, image, type, queryID, tags, dateLost }: QueryItemProps) => {
  const { user } = useUser();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/deleteQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queryID }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error('Failed to delete the query');
      }
    } catch (error) {
      console.error('An error occurred while deleting the query', error);
    }
  };

  return (
    <>
      <div className='mt-8 mb-6 max-sm:mt-1'>
        <TypingAnimation
          className=" font-spaceGrotesk text-white dark:text-white"
          text={type == "FindQuery" ? `${name} finds ${title}.` : `${name} lost ${title}.`}
        />
      </div>
      <div className='flex items-center justify-center mb-5'>
        <Image
          src={image || "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          height="1000"
          width="1000"
          className=" object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        />
      </div>
      {type === "LostQuery" && <div className='flex justify-center items-center mb-5'>
        <p className="text-white">Date Lost : {!dateLost ? "26-11-2005" : dateLost}</p>
      </div>}
      <div className='mt-5 flex justify-center '>
        <p className='text-white'>Description: {description}</p>
      </div>
      {user?.fullName === name &&
        <div className='flex justify-between mt-10 mb-10'>
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={handleDelete}>
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Found
            </span>
          </button>
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={handleDelete}>
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Delete Query
            </span>
          </button>
        </div>}
    </>
  );
}

export default QueryItem;