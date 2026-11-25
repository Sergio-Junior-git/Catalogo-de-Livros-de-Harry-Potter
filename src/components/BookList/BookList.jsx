function getYear(releaseDate) {
  if (typeof releaseDate !== 'string') return 'Ano não informado';
  const match = releaseDate.match(/\b\d{4}\b/);
  return match ? match[0] : 'Ano não informado';
}

export default function BookList({ books, selectedBook, onSelectBook }) {
  return (
    <ul className="book-list" aria-label="Livros de Harry Potter">
      {books.map((book) => (
        <li key={book.number ?? book.title}>
          <button
            className={`book-list__item${selectedBook?.number === book.number ? ' book-list__item--selected' : ''}`}
            type="button"
            onClick={() => onSelectBook(book)}
            aria-pressed={selectedBook?.number === book.number}
          >
            <span className="book-list__title">{book.title || 'Título não informado'}</span>
            <span className="book-list__year">{getYear(book.releaseDate)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
