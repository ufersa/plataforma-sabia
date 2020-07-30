# Sabia API

## Como executar o servidor da API?

1. Crie um arquivo `.env`, baseando-se no arquivo `.env.example`;
2. Crie um banco chamado `sabia` (mesmo nome da key `DB_DATABASE` dentro do arquivo `.env`);
3. Execute as migrations para criar as tabelas no banco:

```
npm run migration:run
```

4. Execute o seguinte comando para popular o banco com os dados iniciais:

```
npm run seed:default
```

5. Preencha `APP_KEY` dentro de .env
6. Inicialize o servidor: `npm start`.
7. O servidor estará disponível em: `http://127.0.0.1:3333`.

Obs.: para executar o **passo 3**, é necessário que as variáveis de ambiente dentro do arquivo `.env` (`DB_HOST`,`DB_PORT`, `DB_USER` e `DB_PASSWORD`) estejam corretas.

## Seeds
Caso queira initializar seu banco com alguns dados de teste, execute o seguinte comando:

```
npm run seed
```
Obs.: Antes de executar esse comando é necessário configurar o Algolia, pois o seeder: `TechnologySeeder` vai retornar um erro.

## Algolia

Para integrar com o algolia, crie uma conta no [Algolia](https://www.algolia.) (existe opção de conta gratuita) e configure o a Aplication ID e Admin API Key nas variáveis `ALGOLIA_APP_ID` e `ALGOLIA_ADMIN_KEY` respectivamente.

Por padrão o nome do index é `serchable_data` mas é possível alterar mudando a variável `ALGOLIA_INDEX_NAME`.

Para indexar todos os dados no Algolia use o seguinte comand:

```
npm run algolia:index
```

## Transaction Emails

Para o envio de emails transacionais configure as credencias SMTP através das seguintes variáveis de ambiente:

```
SMTP_PORT=
SMTP_HOST=
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM=noreply@plataformasabia.com.br
```

Qualquer serviço de email com suporte a SMTP funcionará. Alternativamente você pode criar uma conta gratuita no mailgun.com e usar as credenciais SMTP que ele fornece.

## Uploads

Para o upload é necessário criar a seguinte variável de ambiente:

```
UPLOADS_PATH=
```
Ex. UPLOADS_PATH=resources/uploads

Para os testes é necessário criar a mesma variável dentro de `.envtesting` com outro diretório. 

Ex. UPLOADS_PATH=resources/uploads-testing

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

## Opcionalmente pode-se instalar a CLI do Adonis:

```
npm i --global @adonisjs/cli
```

## Comandos úteis que podem ser usados

### 1. Executar as migrations para criar as tabelas no banco:

```
adonis migration:run
```

### 2. Gerar uma APP_KEY no .env

```
adonis key:generate
```

### 3. Inicializar o servidor:

```
adonis serve --dev
```

### 4. Para acessar a ajuda da CLI basta executar:

```
adonis --help
```
