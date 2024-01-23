'use client'
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import { SearchBar } from './SearchBar';
import { fetchMovieList, Movie } from './api';

export function Movies() {
  const [page, setPage] = useState(1)
  const [pattern, setPattern] = useState("batman")

  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['movies', pattern],
    initialPageParam: 1,
    queryFn: () => fetchMovieList(pattern, page), 
    getNextPageParam: (_, pages) => pages.length + 1
  })

  useEffect(() => {
    console.log("UUU", pattern)
  },[pattern])

  const handleTriggerSearch = (param: string) => {
    setPattern(param)
  }

  return(
    <div>
        <div className="w-full">
          <SearchBar triggerSearch={handleTriggerSearch}/>
        </div>
      {
        data?.pages[page-1]?.results?.map((movie: Movie, k: number) => ( 
          <div key={k}>
            {movie.title}
          </div>
        ))
      }
    </div>
  )
}