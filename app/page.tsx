import { Movies } from './Movies';
import { SearchBar } from './SearchBar';

export default function Home() {
  const url = `${process.env.BASEURL}/discover/movie${process.env.APISETTINGS}`

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border-gray-300">
        <div className="w-full">
          <SearchBar />
        </div>
        <div className='w-full'>
          <Movies url={url} />
        </div>
      </div>
    </main>
  );
}
