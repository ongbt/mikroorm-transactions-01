
# MyWorkspace
 
## DB

Run postgres DB (recommend to use a container) with the following:
- dbName: 'postgres',
- user: 'postgres',
- password: 'Abcd1234.',

## Run tasks

To run the dev server for your app, use:

```sh
pnpm exec nx run my-workspace:serve   
```

 
## Migration tasks

To create migrations:

```sh
npx mikro-orm migration:create   
```

To update DB to latest migrations:

```sh
npx mikro-orm migration:up
``` 