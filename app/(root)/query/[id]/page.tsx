"use client";

import QueryItem from '@/components/QueryItem';
import React, { useEffect } from 'react'

const QueryPage = ({ params }: { params: { id: string } }) => {
  const [query, setQuery] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/query/?id=${params.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuery(data);
        console.log(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  return (
   <>
   {isLoading ? (
        <p className='text-white'>Loading...</p>
      ) : 
      <QueryItem image={query.image} name={query.name} title={query.title} description={query.description} type={query.type} queryID={query.queryID} tags={query.tags} dateLost={query.dateLost} />
      }
   </>
  )
}

export default QueryPage