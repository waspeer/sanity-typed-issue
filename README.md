# Minimal bug reproduction

Reproduction for https://github.com/saiichihashimoto/sanity-typed/issues/394

- I used a [NPM Workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces) to be able to use the local dependencies of @sanity-typed/types. I just included the folders `tsconfig`, `types` and `utils` to keep it minimal.
- I built the `types` package by running `npm run build` inside the `types` folder. I used the same `tsup.config.ts` that's in the original repository.
- I created a sanity-studio package with `pnpm create sanity@latest` and installed dependencies with `pnpm`.
- I installed the local `types` package running `pnpm add ../sanity-typed/types` inside the `sanity-studio` folder and added [the schema provided in the readme](https://github.com/saiichihashimoto/sanity-typed/tree/main/packages/types#usage).
- This results in the following error: `Uncaught error: The requested module '/@fs/Users/wannes/Projecten/Web/waspeer/sanity-typed-issue/sanity-typed/types/dist/index.js?t=1701806909825' does not provide an export named 'defineArrayMember'`
