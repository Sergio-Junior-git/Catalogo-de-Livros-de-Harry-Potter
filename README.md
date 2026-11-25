# Catálogo de Livros — Harry Potter

Aplicação React com Vite que consulta a PotterAPI somente quando a pessoa clica em **Buscar Livros**. A lista mostra título e ano; ao selecionar um volume, o painel apresenta capa, descrição e número de páginas.

## Executar localmente

1. Instale o [Node.js](https://nodejs.org/) (que inclui npm).
2. Abra um terminal nesta pasta do projeto.
3. Execute `npm install` para instalar React e Vite.
4. Execute `npm run dev`.
5. Abra o endereço local mostrado no terminal (normalmente `http://localhost:5173`).

## Passo a passo para testar

1. Recarregue a página e confira que o título e o botão **Buscar Livros** aparecem. A lista deve estar vazia; não há consulta automática.
2. Abra as ferramentas de desenvolvedor do navegador, guia **Network/Rede**, e clique em **Buscar Livros**. Deve surgir uma requisição GET para `https://potterapi-fedeperin.vercel.app/en/books` e a mensagem **Carregando livros...**. O botão fica desabilitado durante a consulta.
3. Após a resposta, confirme que os itens mostram somente o título e o ano de publicação.
4. Clique em um título. O painel **Detalhes** deve mostrar título, ano, descrição, número de páginas e capa.
5. Clique em outro título e confirme que o card é atualizado sem recarregar a página.
6. Para simular erro, na guia **Network/Rede** selecione a requisição e escolha **Block request URL** (ou desligue a rede), depois clique no botão de busca. A aplicação deve mostrar uma mensagem de conexão compreensível. Desbloqueie a URL/restaure a rede e tente novamente.
7. Para conferir o tratamento de dados ausentes, no DevTools use **Network request blocking** ou **Local Overrides** para alterar temporariamente a resposta JSON, definindo `cover` como vazio e removendo `description` ou `pages` de um livro. A interface deve mostrar uma alternativa de capa e mensagens substitutas sem quebrar.
8. Redimensione a janela para largura de celular e confirme que lista e detalhes se reorganizam para uma coluna.

## Conferência dos requisitos

- [x] Título e texto exato do botão.
- [x] Busca manual sob clique, com GET, `response.ok` e `response.json()`.
- [x] Estados React para livros, seleção, carregamento, erro e busca realizada.
- [x] Botão desabilitado durante a consulta e mensagem de carregamento.
- [x] Lista dinâmica com `map()`, chave baseada no identificador `number`, somente título e ano.
- [x] Seleção atualiza os detalhes sem recarregar a página.
- [x] Detalhes incluem capa, título, ano, descrição e páginas, com alternativas para campos ausentes.
- [x] Mensagem inicial de orientação, erro de conexão/HTTP e resposta vazia.
- [x] Componentes separados, props, estado React, layout responsivo e suporte a teclado.

Os campos (`number`, `title`, `releaseDate`, `description`, `pages` e `cover`) correspondem à documentação da [PotterAPI](https://github.com/fedeperin/potterapi#endpoints).
"# Catalogo-de-Livros-de-Harry-Potter" 
