"use client";

import Card from '@/components/Card';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react';

const MyQuery = () => {
  const [queryData, setQueryData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/lostQuery`);
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
        };
    }
    fetchData();

  }, []);

  return (
    <>
    {isLoading ? (
       <Loader />
      ) : queryData.length === 0 ? (
        <p className='text-white'>No query found</p>
      ) : 
      <div className='grid grid-cols-1 md:grid-cols-2'> 
        {
        queryData.map((item: any, index: number) => (
          <Card key={index} title={item.title} image={item.image} description={item.description} type={item.type} queryID={item.queryID} tags={item.tags} />
        ))}
      </div>
      }
    </>
  );
};

export default MyQuery;
