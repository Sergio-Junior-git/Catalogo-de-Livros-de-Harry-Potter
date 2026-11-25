import { useState } from 'react';
import BookList from './components/BookList/BookList.jsx';
import BookDetails from './components/BookDetails/BookDetails.jsx';

const BOOKS_URL = 'https://potterapi-fedeperin.vercel.app/en/books';

export default function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function buscarLivros() {
    setLoading(true);
    setError('');
    setSearched(true);
    setSelectedBook(null);

    try {
      const response = await fetch(BOOKS_URL);
      if (!response.ok) throw new Error('Não foi possível consultar os livros. Tente novamente.');
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('A resposta da API veio em um formato inesperado.');
      setBooks(data);
    } catch (err) {
      setError(err instanceof TypeError ? 'Falha de conexão. Verifique sua internet e tente novamente.' : (err.message || 'Ocorreu um erro inesperado.'));
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient--left" aria-hidden="true" />
      <div className="ambient ambient--right" aria-hidden="true" />
      <header className="hero">
        <div className="hero__crest" aria-hidden="true"><span>✦</span></div>
        <p className="eyebrow hero__eyebrow">Uma jornada pelas páginas</p>
        <h1>Catálogo de Livros <span>— Harry Potter</span></h1>
        <p className="hero__intro">Revisite histórias extraordinárias. Escolha um volume e descubra os detalhes de cada aventura.</p>
        <button className="search-button" type="button" onClick={buscarLivros} disabled={loading}>
          <span className="search-button__icon" aria-hidden="true">{loading ? '◌' : '✧'}</span>
          {loading ? 'Buscando...' : 'Buscar Livros'}
          {!loading && <span className="search-button__arrow" aria-hidden="true">→</span>}
        </button>
        <div className="hero__ornament" aria-hidden="true"><span />✦<span /></div>
      </header>

      <section className="catalog" aria-label="Catálogo de livros">
        <div className="catalog__list-panel">
          <div className="section-heading">
            <div><p className="eyebrow">A coleção</p><h2>Os livros</h2></div>
            {books.length > 0 && <span className="book-count">{String(books.length).padStart(2, '0')} volumes</span>}
          </div>
          {loading && <p className="status-message" role="status"><span className="spinner" />Carregando livros...</p>}
          {error && <p className="status-message status-message--error" role="alert">{error}</p>}
          {!loading && !error && searched && books.length === 0 && <p className="status-message">Nenhum livro foi encontrado.</p>}
          {!loading && books.length > 0 && <BookList books={books} selectedBook={selectedBook} onSelectBook={setSelectedBook} />}
          {!searched && <p className="panel-hint">Sua próxima leitura começa com um clique.</p>}
        </div>

        <div className="catalog__details-panel">
          <div className="section-heading section-heading--details">
            <div><p className="eyebrow">Dentro da história</p><h2>Detalhes</h2></div>
          </div>
          <BookDetails key={selectedBook?.number ?? 'empty'} book={selectedBook} />
        </div>
      </section>
      <footer className="page-footer"><span>PotterAPI</span><span className="page-footer__star" aria-hidden="true">✦</span><span>Feito para quem ainda acredita em magia</span></footer>
    </main>
  );
}
