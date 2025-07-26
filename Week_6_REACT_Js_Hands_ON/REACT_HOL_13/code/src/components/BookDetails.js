import React from 'react';

function BookDetails() {
  const books = [
    { id: 1, title: "Atomic Habits", author: "James Clear" },
    { id: 2, title: "Deep Work", author: "Cal Newport" }
  ];

  return (
    <div>
      <h3>📚 Book List</h3>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <b>{book.title}</b> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookDetails;
