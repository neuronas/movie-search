'use client'
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import { SearchBar } from './SearchBar';
import { fetchMovieList, Movie } from './api';

export function Movies() {
  const [listMovies, setListMovies] = useState<Movie[] | []>([])
  const [page, setPage] = useState<number>(1)
  const [pattern, setPattern] = useState<string | null>(null)

  const fetcher = ({ pageParam }: {pageParam: number}) => {
    setPage(pageParam)
    return fetchMovieList(pattern, pageParam)
  }

  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['movies', pattern],
    initialPageParam: 1,
    queryFn: fetcher,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => lastPageParam + 1,
  })

  useEffect(() => {
    if (data) {
      const newList = data?.pages[page-1].results
      if (page > 1) {
        const oldList = [...listMovies]
        setListMovies([...oldList, ...newList])
      } else {
        setListMovies(newList)
      }
    }
  }, [data])

  const handleTriggerSearch = (param: string) => {
    setPattern(param)
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // load more movies
      fetchNextPage()
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return(
    <div>
        <div className="w-full">
          <SearchBar triggerSearch={handleTriggerSearch}/>
        </div>
      {
        listMovies.map((movie: Movie, k: number) => (
          <div key={k} className="movie-item w-48 m-4 p-4 bg-white shadow-md flex flex-col items-center">
            <h2>{movie.title}</h2>
            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt={k} className="mb-4 w-full h-auto" />
          </div>
        ))
      }
    </div>
  )
}