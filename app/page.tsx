import { Movies } from './movies'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="border-gray-300">
        <Movies />
      </div>
    </main>
  );
}
