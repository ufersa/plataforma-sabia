# Sabia API

## Como executar o servidor da API?

1. Crie um arquivo `.env`, baseando-se no arquivo `.env.example`;
2. Crie um banco chamado `sabia` (mesmo nome da key `DB_DATABASE` dentro do arquivo `.env`);
3. Execute as migrations para criar as tabelas no banco:

```
adonis run migration
```

4. Inicialize o servidor: `npm start`.
5. O servidor estará disponível em: `http://127.0.0.1:3333`.

Obs.: para executar o **passo 3**, é necessário que as variáveis de ambiente dentro do arquivo `.env` (`DB_HOST`,`DB_PORT`, `DB_USER` e `DB_PASSWORD`) estejam corretas.

## Seeds

## Algolia

Para integrar com o algolia, crie uma conta no [Algolia](https://www.algolia.) (existe opção de conta gratuita) e configure o a Aplication ID e Admin API Key nas variáveis `ALGOLIA_APP_ID` e `ALGOLIA_ADMIN_KEY` respectivamente.

Por padrão o nome do index é `serchable_data` mas é possível alterar mudando a variável `ALGOLIA_INDEX_NAME`.

Para indexar todos os dados no Algolia use o seguinte comand:

```
npm run algolia:index
```
## Testes

Para executar os testes crie um banco chamado `sabia-testing` e execute:

```
npm run test
```

Caso queira verificar o code coverage execute:

```
npm run coverage
```

Obs.: para se conectar ao banco `sabia-testing`, o servidor utilizará os valores de usuário (`DB_USER`) e senha (`DB_PASSWORD`) definidos no arquivo `.env`.

## Framework Adonis

Esse projeto foi inicializado utilizando o [Framework Adonis](https://adonisjs.com/)
