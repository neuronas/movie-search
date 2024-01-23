import { Movies } from './movies'

export default async function Home() {
  return (
    <main className="movie-container flex flex-wrap justify-center max-w-4xl mx-auto p-8">
      <div className="border-gray-300">
        <Movies />
      </div>
    </main>
  );
}
