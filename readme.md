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
## exists

O método ``exists`` verifica se uma sessão específica existe no banco de dados. Isso é útil para verificar a validade de uma sessão antes de realizar outras operações.
`
```js
const sessionId = 'id-da-sessao'; // ID da sessão a ser verificada
sessionStore.exists(sessionId)
  .then((exists) => {
    if (exists) {
      console.log('A sessão existe.');
    } else {
      console.log('A sessão não existe.');
    }
  })
  .catch((error) => {
    console.error('Erro ao verificar a existência da sessão:', error);
});
```
## clearExpired

O método ``clearExpired`` é responsável por remover sessões que estão expiradas do banco de dados. Isso ajuda a manter a tabela de sessões limpa e otimizada.

```js
sessionStore.clearExpired()
  .then(() => {
    console.log('Sessões expiradas removidas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao remover sessões expiradas:', error);
});
```
## count

O método ``count`` retorna o número total de sessões armazenadas no banco de dados. Isso é útil para monitorar o uso de sessões e verificar se está dentro dos limites esperados.

```js
sessionStore.count()
  .then((count) => {
    console.log(`Total de sessões ativas: ${count}`);
  })
  .catch((error) => {
    console.error('Erro ao contar as sessões:', error);
});
```
## getSessionData

O método ``getSessionData`` pode ser utilizado para obter dados específicos de uma sessão, em vez de retornar todos os dados da sessão. Isso é útil quando você precisa acessar apenas informações específicas de uma sessão.

```js
const sessionId = 'id-da-sessao'; // ID da sessão da qual você deseja obter dados específicos
sessionStore.getSessionData(sessionId, ['userId', 'role'])
  .then((sessionData) => {
    console.log('Dados da sessão:', sessionData);
  })
  .catch((error) => {
    console.error('Erro ao obter os dados da sessão:', error);
});
```
## getAllSessions

O método ``getAllSessions`` permite que você recupere todas as sessões armazenadas no banco de dados. Isso é útil para monitorar o estado atual de todas as sessões ativas.

```js 
sessionStore.getAllSessions()
  .then((sessions) => {
    console.log('Todas as sessões:', sessions);
  })
  .catch((error) => {
    console.error('Erro ao obter todas as sessões:', error);
});
```
## deleteSession

O método ``deleteSession`` é responsável por remover uma sessão específica do banco de dados. Isso é útil quando você deseja encerrar uma sessão específica antes do tempo de expiração.

```js
const sessionId = 'id-da-sessao';

sessionStore.deleteSession(sessionId)
  .then(() => {
    console.log('Sessão removida com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao remover a sessão:', error);
});
```
## extendSession

O método ``extendSession`` é responsável por estender o tempo de expiração de uma sessão. Isso pode ser útil quando um usuário está ativo e você deseja garantir que sua sessão não expire.

```js
const sessionId = 'id-da-sessao';
const newExpiration = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos a partir de agora

sessionStore.extendSession(sessionId, newExpiration)
  .then(() => {
    console.log('Sessão estendida com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao estender a sessão:', error);
});
```