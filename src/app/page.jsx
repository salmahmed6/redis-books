import { client } from '@/lib/db'
import Link from 'next/link'

const getBooks = async () => {
  const result = await client.zRangeWithScores('books', 0, -1)

  // [{value: 'abc', score: '2397'}, {value: 'def', score: '4233'}]

  // client.hGetAll('books:4235')
  // client.hGetAll('books:53465')
  // client.hGetAll('books:76867')
  // client.hGetAll('books:13643')

  const books = await Promise.all(result.map((b) => {
    return client.hGetAll(`books:${b.score}`)
  }))
  return books
}

export default async function Home() {
  const books = await getBooks()
  return (
    <main>
      <nav className="flex justify-between">
        <h1 className='font-bold'>Books on Redis!</h1>
        <Link href="/create" className="btn">Add a new book</Link>
      </nav>
      
      {books.map((book) => (
        <div key={book.title} className='card'>
          <h2> {book.title}</h2>
          <p>By {book.author}</p>
          <p>Rating {book.ratirg}</p>
        </div>
      ))}
    </main>
  )
}