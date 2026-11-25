import { useState } from 'react';

function getYear(releaseDate) {
  if (typeof releaseDate !== 'string') return 'Ano não informado';
  const match = releaseDate.match(/\b\d{4}\b/);
  return match ? match[0] : 'Ano não informado';
}

export default function BookDetails({ book }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!book) {
    return (
      <div className="details-empty">
        <span className="details-empty__mark" aria-hidden="true">✦</span>
        <p>Selecione um livro para visualizar os detalhes.</p>
      </div>
    );
  }

  const hasCover = book.cover && !imageFailed;

  return (
    <article className="book-details" aria-live="polite">
      <div className="book-details__cover-wrap">
        {hasCover ? (
          <img
            className="book-details__cover"
            src={book.cover}
            alt={`Capa do livro ${book.title || ''}`}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="book-details__cover-placeholder" role="img" aria-label="Capa não disponível">
            <span aria-hidden="true">✧</span>
            <small>Capa não disponível</small>
          </div>
        )}
      </div>
      <div className="book-details__content">
        <p className="eyebrow">O livro selecionado</p>
        <h2>{book.title || 'Título não informado'}</h2>
        <p className="book-details__year">Publicado em {getYear(book.releaseDate)}</p>
        <div className="book-details__rule" />
        <p className="book-details__description">{book.description || 'Descrição não disponível.'}</p>
        <p className="book-details__pages">
          <span className="book-details__pages-icon" aria-hidden="true">▤</span>
          {Number.isFinite(book.pages) ? `${book.pages} páginas` : 'Número de páginas não informado'}
        </p>
      </div>
    </article>
  );
}
