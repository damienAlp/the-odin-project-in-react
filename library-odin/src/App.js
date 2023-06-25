import { useState } from 'react'

import './App.css'

function App() {
  // STATES
  const [newBook, setNewBook] = useState({
    bookTitle: '',
    author: '',
    pageNum: '',
    category: '',
    isRead: false,
  })

  // BOOKS DATA
  const [books, setBooks] = useState([
    {
      id: 1,
      bookTitle: 'qqq',
      author: 'wwww',
      pageNum: 111,
      category: 'fiction',
      isRead: false,
    },
    {
      id: 2,
      bookTitle: 'eee',
      author: 'rrr',
      pageNum: 222,
      category: 'science',
      isRead: false,
    },
  ])
  // STATES END

  // BOOKLIST
  const bookList = books.map(
    ({ id, bookTitle, author, pageNum, category, isRead }) => {
      return (
        <div key={id}>
          <h3>{bookTitle}</h3>
          <h5>{author}</h5>
          <h5>{pageNum}</h5>
          <h5>{category}</h5>
          <h5 onClick={() => toggleIsRead(id)}>
            {isRead ? (
              <span style={{ color: 'green' }}>Read</span>
            ) : (
              <span style={{ color: 'red' }}>Not Read</span>
            )}
          </h5>
          <button onClick={() => removeBook(id)}>Remove</button>
        </div>
      )
    }
  )

  // HANDLE INPUT CHANGE
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }))
  }

  // ADD BOOK START
  const addBook = (event) => {
    event.preventDefault()

    const newBookVar = {
      id: bookList.length + 1,
      ...newBook,
    }

    // ADD THE NEWBOOK TO BOOKS
    setBooks((prevBooks) => [...prevBooks, newBookVar])

    // EMPTY FORM INPUTS
    setNewBook({
      bookTitle: '',
      author: '',
      pageNum: '',
      category: '',
      isRead: false,
    })
  }

  // ADD BOOK END

  // REMOVE BOOK
  const removeBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
  }

  // TOGGLE ISREAD
  const toggleIsRead = (id) => {
    setBooks((prevBooks) => {
      return prevBooks.map((book) => {
        if (book.id === id) {
          return { ...book, isRead: !book.isRead }
        }
        return book
      })
    })
  }

  return (
    <div>
      <h1>Library</h1>

      {/* ADD BOOK FORM */}
      <form onSubmit={addBook}>
        <input
          type="text"
          placeholder="Book Title"
          name="bookTitle"
          value={newBook.bookTitle}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Page Number"
          name="pageNum"
          value={newBook.pageNum}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={newBook.category}
          onChange={handleInputChange}
        />
        <button type="submit">Add Book</button>
      </form>

      {/* BOOKS */}
      {bookList}
    </div>
  )
}

export default App
