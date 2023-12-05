# Minimal bug reproduction

Reproduction for https://github.com/saiichihashimoto/sanity-typed/issues/394

- I used a [NPM Workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces) to be able to use the local dependencies of @sanity-typed/types. I just included the folders `tsconfig`, `types` and `utils` to keep it minimal.
- I built the `types` package by running `npm run build` inside the `types` folder. I used the same `tsup.config.ts` that's in the original repository.
- I created a sanity-studio package with `pnpm create sanity@latest` and installed dependencies with `pnpm`.