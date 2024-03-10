
## Boilerplate used to apply an assesment

  This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

___

### requeriments:

create .env file at the root project with those environment variables **(must to have a TMDB valid token)**

```javascript
NEXT_PUBLIC_BASEURL = "https://api.themoviedb.org/3"
ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODFjYTEwZjg4OWUwZjQyNWFjY2MzMjllOGUzZhYyMyIsInN1YiI6IjY1Mjk3ZmU2MWYzZTYwMDEzOTlkYWQxZSIsInNjb3Blcyk6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KfCZXS3Ie8lCEyRMxOXXXY0dTnzpk3PBVa98MfP0IT8"
```
___

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


### the project implements these libraries

- nextjs
```javascript
 npx create-next-app@latest my-app --typescript --tailwind --eslint
```
- shadcn
```javascript
 npx shadcn-ui@latest init
 npx shadcn-ui@latest add input
```
- other dependencies,
```javascript
 npm i @tanstack/react-query react-hook-form zod @hookform/resolvers zustand
```

**docs**
- tanstack query : https://tanstack.com/query/latest/docs/react/reference/useInfiniteQuery
- react-hook-form : https://github.com/react-hook-form/resolvers#zod
- zod : https://zod.dev/?id=introduction
- zustand : https://docs.pmnd.rs/zustand/getting-started/introduction