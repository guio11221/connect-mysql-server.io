## Installation

Add to your application via `npm`:
```bash
npm install connect-mysql-server.io--save
```
<br>
## Usage

Use with your express session middleware, like this:
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
<br>

#### Custom database table schema

```js
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

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