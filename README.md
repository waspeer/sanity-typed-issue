# Minimal bug reproduction

This readme outlines the steps to take to reproduce an error I encountered while debugging issue https://github.com/saiichihashimoto/sanity-typed/issues/394#issuecomment-1837611478. Please mind that this does not reproduce a bug in the original package, but is just an explanation of the steps I took to encounter this specific error.

**Node:** v18.19.0
**NPM:** v10.2.3
**PNPM:** v8.11.0

## Steps

### Add Minimal Version of Sanity Typed

Commit: 38e587a2a78e106a35c7f424f81f3c2af6058e04

- Set up a [NPM Workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces) to utilize local dependencies from `@sanity-typed/types`. Included only `tsconfig`, `types`, and `utils` for minimal setup.
- Built the types package using `npm run build` in the `types` folder, with `tsup.config.ts` from the original repository. (Note that the `dist` folder is not included in the repository, so to reproduce this step, you'll have to build the package yourself.)

### Add Sanity Studio

Commit: 2147524f3b46a13efc0b1c2f3c47f2cb365b365a

- Created a new `sanity-studio` package running `pnpm create sanity@latest`.
- Installed necessary dependencies with `pnpm`.

### Install Local Sanity Typed and Trigger Resolution Error

Commit: 167576d18d943b03676cd70b9ec402fd7e5a9be9

- Installed the local `types` package in `sanity-studio` using `pnpm add ../sanity-typed/types`.
- Integrated the schema as [suggested in the usage section of sanity-typed](https://github.com/saiichihashimoto/sanity-typed/tree/main/packages/types#usage).
- Encountered an error while running the studio: 

```  
Uncaught error: The requested module '/@fs/Users/wannes/Projecten/Web/waspeer/sanity-typed-issue/sanity-typed/types/dist/index.js?t=1701806909825' does not provide an export named 'defineArrayMember'.
```

### Triggering the `module not defined` Error

Commit: 4606b0b2cc396fafcdc4699b0f0219d6f8684bba

I triggered this error while debbugging the previous error. I just wanted to include it here to show how I encountered it.

- Temporarily reverted the imports back to `sanity` instead of `@sanity-typed/types` to remove the error.
- Added these lines for debugging:

```ts
import * as sanityTypedTypes from '@sanity-typed/types'
console.log('sanityTypedTypes', sanityTypedTypes)
```

- This resulted in the error [I remembered and mentioned in the issue](https://github.com/saiichihashimoto/sanity-typed/issues/394#issuecomment-1837611478):

```
ReferenceError: module is not defined
    at http://localhost:3333/@fs/Users/wannes/Projecten/Web/waspeer/sanity-typed-issue/sanity-typed/types/dist/index.js:32:1
```

### Building the Types Package as ESM

Commit: a2fb3d6bc6d0e8ad013e83ad2a484bef1a6f9566

- Built the `types` package to ESM using `tsup`. (To reproduce this step, run `npm run build-esm` in the `types` folder.)
- Changed the `main` and `types` fields in package.json to export the ESM files.
- This change resolved the import/export issue in the studio.