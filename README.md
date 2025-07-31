
# Blog Pessoal - Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<p align="center">
  Projeto desenvolvido com <strong>NestJS</strong> — um framework moderno, eficiente e escalável para aplicações Node.js no lado do servidor.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

## 📌 Sobre o Projeto

Este é o repositório do backend do projeto **Blog Pessoal**, construído com NestJS e TypeScript.  
Tem como objetivo fornecer uma API RESTful segura e escalável, com suporte a autenticação, criação e gerenciamento de postagens e temas.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [JWT](https://jwt.io/)
- [PostgreSQL](https://www.postgresql.org/) + Prisma ORM
- [Swagger](https://swagger.io/) para documentação da API

---

## 🔧 Instalação e Execução

```bash
# Clone o repositório
$ git clone https://github.com/naahcarvalho/blog-pessoal-backend.git

# Acesse o diretório
$ cd blog-pessoal-backend

# Instale as dependências
$ npm install

# Crie o arquivo .env com as variáveis de ambiente necessárias
```

### 🌱 Comandos principais

```bash
# Iniciar em modo desenvolvimento
$ npm run start:dev

# Iniciar em produção
$ npm run start:prod

# Rodar testes unitários
$ npm run test

# Cobertura de testes
$ npm run test:cov
```

---

## 📚 Documentação da API

Após rodar a aplicação, acesse:

```
http://localhost:3000/api
```

A documentação interativa estará disponível via Swagger.

---

## 🛠 Estrutura do Projeto

```
📁 src
 ┣ 📂 auth         -> Autenticação e geração de tokens
 ┣ 📂 post         -> CRUD de postagens
 ┣ 📂 tema         -> CRUD de temas
 ┣ 📂 user         -> Cadastro e gerenciamento de usuários
 ┗ 📜 main.ts      -> Ponto de entrada da aplicação
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

---

## 🧑‍💻 Desenvolvedora

- [Nathalia Carvalho](https://github.com/naahcarvalho)

---

## 📝 Licença

Este projeto está licenciado sob a licença MIT.
