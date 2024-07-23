"use client";

import Card from '@/components/Card';
import Loader from '@/components/Loader';
import React, { useEffect } from 'react';

const MyQuery = () => {
  const [queryData, setQueryData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/findQuery`);
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
          <Card key={index} title={item.title} description={item.description} image={item.image} type={item.type} queryID={item.queryID} tags={item.tags} />
        ))}
      </div>
      }
    </>
  );
};

export default MyQuery;
