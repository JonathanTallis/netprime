# Projeto NetPrime 2.0 – Catálogo de Filmes com Contass de Usuário

Este projeto começou como uma aplicação prática dos conceitos de React.js (Versão 1.0) e foi estrategicamente evoluído para a Versão 2.0, uma aplicação web completa com um Backend as a Service (BaaS) da Firebase.

A nova versão transforma a experiência do usuário ao adicionar um sistema de contas, autenticação e armazenamento de dados persistentes na nuvem.

---

## Deploy

[Clique aqui para acessar a aplicação](https://jonathantallis.github.io/netprime/)

---

## Tecnologias Utilizadas

- React.js (com Create React App)
- Firebase v9+ (Authentication & Cloud Firestore)
- React Router DOM
- React Context API
- React Toastify
- HTML5 / CSS3
- Axios (consumo de API)
- API The Movie Database (TMDB)

---

## Funcionalidades

**Versão 1.0 (Base do Curso):**
- Listagem de filmes em cartaz
- Visualização de detalhes de cada filme
- Adicionar e remover filmes favoritos (armazenados no navegador/localStorage)
- Tratamento de rotas inexistentes (página de erro personalizada)
- Layout adaptado e responsivo com CSS

**Melhorias e Novas Funcionalidades (Versão 2.0)**
- **Sistema de Autenticação:** Implementação de cadastro, login e logout seguros utilizando Firebase Authentication.
- **Perfil de Usuário:** O usuário agora se cadastra com um nome que é utilizado para personalizar a experiência.
- **Favoritos na Nuvem:** A lista de filmes favoritos foi migrada para o Cloud Firestore, o banco de dados NoSQL do Firebase.
- **Persistência de Dados entre Dispositivos:** O principal benefício: o usuário pode acessar sua lista de favoritos de qualquer computador ou navegador ao fazer login.
- **Estado Global com Context API:** Gerenciamento centralizado da sessão do usuário, permitindo que toda a aplicação saiba quem está logado em tempo real.
- **Rotas Protegidas:** A página "Meus Filmes" agora é exclusiva para usuários autenticados, redirecionando visitantes para a página de login.
- **Interface Reativa ao Login:** Componentes, como o Header, mudam dinamicamente para exibir informações do usuário e opções contextuais (como o botão "Sair").
- **UX Aprimorada:** Interações como tentar salvar um filme sem estar logado agora fornecem feedback claro, incentivando o usuário a criar uma conta.

---

## Preview

![Preview do NetPrime](https://github.com/JonathanTallis/netprime/blob/main/public/preview.gif?raw=true)

---

## Aprendizados

Durante o desenvolvimento deste projeto, pratiquei:

- Criação de rotas com **React Router DOM**
- Consumo de API externa com **Axios**
- Manipulação de estados e props no React
- Armazenamento local de dados no navegador
- Personalização de layout com CSS
- Integração Front-end com um Backend as a Service (Firebase).
- Operações de CRUD (Create, Read, Update) no Firestore.
- Gerenciamento de Estado Global com Context API.
- Criação de componentes de alta ordem para proteção de rotas (PrivateRoute).
- Fluxo de autenticação e gerenciamento de sessão de usuário.

---

## Autor

**Jonathan Tallis Pereira de Fonte**  
🔗 [LinkedIn](https://www.linkedin.com/in/jonathantallis) | [GitHub](https://github.com/JonathanTallis)
