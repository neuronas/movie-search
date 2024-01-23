'use client'
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import { SearchBar } from './SearchBar';
import { fetchMovieList, Movie } from './api';
import { useMoviesStore, useSearchStore } from "@/lib/store";

export function Movies() {
  const { movieList, addToList: handleSetMovieList, removeList } = useMoviesStore((state) => state);
  const { pattern } = useSearchStore((state) => state);

  const [page, setPage] = useState<number>(1)
  const fetcher = ({ pageParam }: {pageParam: number}) => {
    setPage(pageParam)
    if (!pattern) return
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
      const newList = data?.pages[page-1]?.results
      if (newList) {
        if (page > 1) {
          handleSetMovieList(newList)
        } else {
          removeList()
          handleSetMovieList(newList)
        }
      }
    }
  }, [data])

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
          <SearchBar />
        </div>
      {
        movieList.map((movie: Movie, k: number) => (
          <div key={k} className="movie-item w-48 m-4 p-4 bg-white shadow-md flex flex-col items-center">
            <h2>{movie.title}</h2>
            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt={k} className="mb-4 w-full h-auto" />
          </div>
        ))
      }
    </div>
  )
}