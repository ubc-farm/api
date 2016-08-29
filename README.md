# ubc-farm API
API server for the ubc-farm program. All its routes are prefixed with `/api/`.

The [wiki](wiki) contains notes about the REST api paths.

## Development Setup
```
git clone https://github.com/ubc-farm/server-api.git
cd server-api
npm install
```

**Set up database tables**
```
npm run migrate
```

**Load fake data for development**
```
npm run seed
```

**Start the server**
```
npm start
```