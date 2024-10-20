# MySQLStore

MySQLStore é um armazenamento de sessão para o middleware `express-session`, que utiliza um banco de dados MySQL para gerenciar sessões de forma persistente. Este módulo é útil para aplicações que precisam armazenar sessões de usuário em um banco de dados relacional.

## Instalação

Para instalar o MySQLStore, execute o seguinte comando no terminal:

```
npm install connect-mysql-server.io --save
```
## Uso

### Configuração

Para usar o MySQLStore, você precisa criar uma conexão com o banco de dados MySQL e configurar o middleware de sessão no seu aplicativo Express.

```js
const express = require('express');
const app = module.exports = express();
const session = require('express-session');
const MySQLStore = require('connect-mysql-server.io')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'session_test',
	password: 'password',
	database: 'session_test'
};

const sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// Optionally use onReady() to get a promise that resolves when store is ready.
sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});
```
## Custom database table schema

```js
const session = require('express-session');
const MySQLStore = require('connect-mysql-server.io')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'session_test',
	password: 'password',
	database: 'session_test',
	createDatabaseTable: false,
	schema: {
		tableName: 'custom_sessions_table_name',
		columnNames: {
			session_id: 'custom_session_id_column_name',
			expires: 'custom_expires_column_name',
			data: 'custom_data_column_name'
		}
	}
};

const sessionStore = new MySQLStore(options);
```

## Métodos Disponíveis
## get
chamada ``store`` e um ``session_id`` que você deseja recuperar:`

```js
 sessionStore.get(sessionId)
   .then((sessionData) => {
     if (sessionData) {
       console.log('Sessão encontrada:', sessionData);
     } else {
       console.log('Sessão não encontrada ou expirou.');
     }
   })
   .catch((error) => {
     console.error('Erro ao buscar a sessão:', error);
   });
```

## set
O método ``set`` é utilizado para armazenar uma nova sessão ou atualizar uma sessão existente no banco de dados. 

```js
const sessionData = {
  userId: 123,
  name: 'John Doe',
  lastAccess: new Date().toISOString()
};

sessionStore.set(sessionId, sessionData)
  .then(() => {
    console.log('Sessão armazenada com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao armazenar a sessão:', error);
  });
```
## destroy
O método ``destroy`` é usado para excluir uma sessão do banco de dados com base no ``session_id``.
```js
sessionStore.destroy(sessionId)
  .then(() => {
    console.log('Sessão excluída com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao excluir a sessão:', error);
});
```

## all
O método ``all`` é usado para recuperar todas as sessões armazenadas no banco de dados. Este método é útil quando você precisa verificar todas as sessões ativas ou realizar operações em massa.

```js
sessionStore.all()
  .then((sessions) => {
    console.log('Todas as sessões:', sessions);
  })
  .catch((error) => {
    console.error('Erro ao recuperar as sessões:', error);
});
```
## length
O método ``length`` retorna o número total de sessões armazenadas. Isso pode ser útil para monitorar o uso ou para tomar decisões baseadas na quantidade de sessões ativas.

```js
sessionStore.length()
  .then((count) => {
    console.log('Número total de sessões:', count);
  })
  .catch((error) => {
    console.error('Erro ao contar as sessões:', error);
  });
```
## clear

O método ``clear`` é usado para remover todas as sessões do banco de dados. Use com cuidado, pois isso excluirá todos os dados de sessão.

```js 
sessionStore.clear()
  .then(() => {
    console.log('Todas as sessões foram excluídas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao excluir as sessões:', error);
});
```