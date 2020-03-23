# plataforma-sabia

[![Build Status](https://travis-ci.com/ufersa/plataforma-sabia.svg?branch=master)](https://travis-ci.com/ufersa/plataforma-sabia)
[![Coverage Status](https://coveralls.io/repos/github/ufersa/plataforma-sabia/badge.svg?branch=master)](https://coveralls.io/github/ufersa/plataforma-sabia?branch=master)

A Plataforma de Tecnologias do Semi-Árido Brasileiro.

## Qual o objetivo da Plataforma Sabiá?

## Como o projeto está organizado?

Nesse projeto, utilizamos uma estrutura de Monorepo com 3 pacotes principais:

- [admin](packages/admin): contém o código relativo ao frontend do sistema administrativo da plataforma.
- [api](packages/api): contém o código relativo ao backend (API Rest) do sistema administrativo da plataforma.
- [web](packages/web): contém o código relativo ao site da plataforma.

## O que é necessário para iniciar o projeto localmente?

1. Instale as dependências listadas na raiz do projeto: `npm install`;

2. Instale as dependências listadas em cada um dos pacotes da aplicação e vincule aquelas que são dependências em comum:

```js
npm run bootstrap
```

3. Em seguida, siga as instruções inclusas em cada um dos pacotes do projeto:

- [admin](packages/admin)
- [api](packages/api)
- [web](packages/web)
