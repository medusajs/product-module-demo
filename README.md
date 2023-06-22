<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h2 align="center">
  Medusa Product Module demo 
</h2>

<h4 align="center">
  <a href="https://product-module.medusajs.com/?utm_source=product-module-demo&utm_medium=recap&utm_campaign=github&utm_content=readme">Live Demo</a> |
  <a href="https://docs.medusajs.com/modules/products/serverless-module?utm_source=product-module-demo&utm_medium=recap&utm_campaign=github&utm_content=readme">Documentation</a>
</h4>
<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## Medusa Product Module demo in Next.js functions

This demo showcases our Product Module running in a serverless Next.js function. In the demo, we're using the Product Module to personalize the storefront in real time based on the user location and behavior.

## What are Medusa Modules?

Modules are packages with self-contained commerce logic, promoting separation of concerns, maintainability, and reusability. Modules increase Medusa's extensibility, allowing for customization of core commerce logic and composition with other tools. This flexibility allows for greater choice in the tech stack used in conjunction with Medusa.


## Prerequisites
The Product Module must connect to a PostgreSQL database. You can refer to [this guide](https://docs.medusajs.com/development/backend/prepare-environment#postgresql) to learn how to install PostgreSQL locally. Alternatively, you can use free PostgreSQL database hosting, such as [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres). If you have an existing Medusa database, you can use it as well.

## Get started
To run the demo locally, follow these steps: 
### Step 1. Clone this repo and install the dependencies.
In the project root, run:
```bash
npm install
``` 
or
```bash
yarn
```

### Step 2: Add Database Configurations
Create a .env file and add the following environment variable:
```
POSTGRES_URL=<DATABASE_URL>
```
Where `<DATABASE_URL>` is your database connection URL of the format `postgres://[user][:password]@[host][:port]/[dbname]`. You can learn more about the connection URL format in [this guide](https://docs.medusajs.com/development/backend/configurations#postgresql-configurations).

### Step 3: Run Database Migrations and seed the Database
```bash
npm run product:migrations:run
# optionally
npm run product:seed
```
or
```bash
yarn product:migrations:run
# optionally
yarn product:seed
```

### Step 4: Run the app locally
Run the app with `npm run dev` or `yarn dev`.


