"use client";

import Card from '@/components/Card';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';

const MyQuery = () => {
  const { user } = useUser();
  const [queryData, setQueryData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/myQuery?name=${encodeURIComponent(user.fullName!)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setQueryData(data);
          console.log(data);
        } catch (error) {
          console.error('Fetch error:', error);
        }
        finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  return (
    <>
    {isLoading ? (
        <p className='text-white'>Loading...</p>
      ) : queryData.length === 0 ? (
        <p className='text-white'>No query found</p>
      ) : 
      <div className='grid grid-cols-1 md:grid-cols-2'> 
        {Array.isArray(queryData) &&
        queryData.map((item: any, index: number) => (
          <Card key={index} title={item.title} image={item.image} description={item.description} type={item.type} queryID={item.queryID} tags={item.tags} />
        ))}
      </div>
      }
    </>
  );
};

export default MyQuery;