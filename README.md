# Example repository to track down TypeScript issues

- [Example repository to track down TypeScript issues](#example-repository-to-track-down-typescript-issues)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Replicate issues](#replicate-issues)
  - [Issues](#issues)
    - [Property 'xyz' does not exist on type](#property-xyz-does-not-exist-on-type)
    - [This expression is not callable](#this-expression-is-not-callable)

## Prerequisites

- Node >= 20
- NPM >= 9

It is recommended to use `nvm` to manage your Node and NPM versions.

## Install

1. `nvm use 20`
2. `npm ci`

## Replicate issues

1. `npm run ts:check`

## Issues

_DISCLAIMER_: The code is not necessarily runnable or even makes sense, yet those TS issues should not occur.

### Property 'xyz' does not exist on type

```sh
src/index.ts:6:13 - error TS2339: Property 'click' does not exist on type 'typeof import("/Users/111122223333/Projects/ts-issue/node_modules/@testing-library/user-event/dist/types/index")'.

6   userEvent.click(screen.getByRole('textbox'))
```

This error can be fixed by changing the code as following from

```TypeScript
  userEvent.click(screen.getByRole('textbox'))
```

to

```TypeScript
  userEvent.default.click(screen.getByRole('textbox'))
```

### This expression is not callable

```sh
src/index.ts:9:15 - error TS2349: This expression is not callable.
  Type 'typeof import("/Users/111122223333/Projects/ts-issue/node_modules/next/index")' has no call signatures.

9   const app = next({
```

This error can be fixed by changing the code as following from

```TypeScript
  const app = next({
```

to

```TypeScript
  const app = next.default({
```

Only when adding `default`, the types are applied correctly. In VSCode, without `default`, `app` is an `any` type, but with `default` it is `NextServer` as expected.
