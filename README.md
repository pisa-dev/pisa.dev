[![pisa.dev](https://raw.githubusercontent.com/pisa-dev/pisa.dev/15fc6c81018738f48dd2fa4300e4c4f0c43d7dc8/public/logo.svg)](https://pisa.dev/)

<div align="center">
  <a href="https://github.com/pisa-dev/pisa.dev/blob/main/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" /></a>
</div>

---

## Getting started

### How to execute the stack locally:

- Clone the repo in a local directory:
```
git clone git@github.com:pisa-dev/pisa.dev.git
```
- Navigate to the folder
- Run: 
```
npm install
```
- Install Docker
> Refer to [Docker's official documentation](https://docs.docker.com/engine/install/)
- Install mysql image
```
docker pull mysql
```
- Launch mysql locally inside a docker container:
```
docker run --name mysql -e MYSQL_ROOT_PASSWORD=secret -p 3306:3306 -d mysql
```
- Copy the `.env.example` file content in your `.env` file
- Set the variable `DATABASE_URL = 'mysql://root:secret@127.0.0.1:3306/pisadev'` in your `.env` file
- Run to initialize an empty database:
```
npx prisma db push
```
> If Prisma is not installed automatically, refer to [Prisma's official documentation](https://www.prisma.io/docs/concepts/components/prisma-cli/installation)
- Run to execute Next.js locally:
```
npm run dev
```
- Navigate to `http://localhost:3000` 

## Contributing

To contribute follow the [guidelines](https://github.com/pisa-dev/pisa.dev/blob/main/CONTRIBUTING.md) and don't hesitate to ask for help or guidance.

---

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

[![powered by vercel](./public/powered-by-vercel.svg)](https://vercel.com/?utm_source=pisa-dev&utm_campaign=oss)
