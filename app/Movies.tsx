'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchMovieList } from './api';
import { Root } from './api';

export function Movies({ url }: { url: string }) {
  const { isPending, isError, data, error } = useQuery<Root>({ queryKey: ['movies'], queryFn: () => fetchMovieList(url) })

  return(
    <div>
      {
        data?.results.map((v,k) => ( 
          <div key={k}>
            {v.title}
          </div>
        ))
      }
    </div>
  )
} 