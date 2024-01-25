'use client'
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import { SearchBar } from './SearchBar';
import { fetchMovieList, Movie } from './api';
import { useMoviesStore, useSearchStore, useBoundStore, MovieList } from "@/lib/store";

export function Movies() {
  const { movieList, addToList: handleSetMovieList, removeList } = useMoviesStore((state) => state);
  const { pattern } = useSearchStore((state) => state);

  const hasHydrated = useBoundStore(state => state._hasHydrated);
  const fetcher = ({ pageParam }: {pageParam: number}) => {
    return fetchMovieList(pattern, pageParam)
  }

  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['movies', pattern],
    queryFn: fetcher,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => lastPageParam + 1,
    initialPageParam: 1,
    initialData: hasHydrated && movieList || undefined,
    enabled: hasHydrated,
    refetchOnMount: false,
  })

  useEffect(() => {
    if (hasHydrated && data && data.pages[0]) {
      handleSetMovieList(data as MovieList)
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
    <>
      {hasHydrated &&
      <div>
          <div className="w-full">
            <SearchBar />
          </div>
        {
          movieList && movieList?.pages?.flatMap((page) => page.results).map((movie: Movie, k: number) => (
            <div key={k} className="movie-item w-48 m-10 p-4 bg-white shadow-md rounded-md">
              <div className='image'>
                {movie.poster_path && <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt={k} className="mb-1 h-auto" />}
              </div>
              <div className='desc text-clip overflow-hidden'>
                <h1 className='text-2xl'>{movie.title}</h1>
                <span>{movie.overview}</span>
              </div>
            </div>
          ))
        }
      </div>
      }
    </>
  )
}