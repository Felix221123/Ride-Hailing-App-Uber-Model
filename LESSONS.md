# LESSONS I LEARNT FROM BUILDING THIS BACKEND PROJECT





### COMMANDS NEEDED TO RUN MIGRATIONS AND EXPORT THEM TO POSTGRESQL

   Command used for migrating all classes and attributes to the migration folder
```bash
   npx typeorm-ts-node-esm migration:generate -d ./src/data-source.ts src/migration/InitialMigration
   ```

   Command to run all pending migrations to the database
```bash
   npx typeorm-ts-node-esm migration:run -d ./src/data-source.ts 
   ```


   Command to view your existing migrations table
```bash
   npx typeorm-ts-node-esm schema:log -d ./src/data-source.ts 
   ```



   if you are updating the existing migrations for your application, use the cmd, 
```bash
   npx typeorm-ts-node-esm migration:generate -d ./src/data-source.ts src/migration/<migrationName>
   ```