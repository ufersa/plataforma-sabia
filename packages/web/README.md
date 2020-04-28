# Sabia Website

## Como executar o website da plataforma?

1. Inicialize o servidor: `npm run dev`.
2. O serviço estará disponível em: `http://localhost:3000`.

## Storybook

Execute `npm run storybook` para executar o storybook.

## Visual Regression Testing

Execute `npm run jest:visual` com o servidor to storybook aberto para rodar os testes de regressão visual.

Caso tenha introduzido uma mudança nos componentes da aplicação e estas sejam planejadas, atualize as imagens de referência com seguinte comand:

```
npm run jest:visual:update
```

Por conveniência há tem o seguinte comando que inicialize o storybook e roda os testes

```
npm run test:visual
```

## Create Next App

Esse projeto foi inicializado utilizando o [Create Next App](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).
