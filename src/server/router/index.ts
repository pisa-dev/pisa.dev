// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { newsletterRouter } from "./newsletter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("newsletter.", newsletterRouter)
  .merge("example.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
