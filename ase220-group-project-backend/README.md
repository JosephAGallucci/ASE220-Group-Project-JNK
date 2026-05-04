# backend

node + express + mongoose. routes are in `src/routes/`.

run with docker from the repo root:

```
docker compose up --build
```

or locally:

```
cp .env.example .env
npm install
npm start
```

needs a mongo running (see docker-compose).

TODO:
- input validation is pretty minimal
- no tests yet
