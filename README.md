# Next Js Progress Loader

- A next Js Loading Bar component made using Nprogress, works with Next.js 13.
- Additional feature: call function to navigate between routes instead useRouter() [beta]

Important context: Latter the Next.Js 13 update, router events has ben depreciated and still there's no 'next native resource' to manipulate router events as before. But, i found 2 ways to make the UX better.

## Install

using npm:

```bash
npm install nextjs-progressloader
```

using yarn:

```bash
yarn add nextjs-progressloader
```

## Basic Usage

import using:

```js
import { ProgressLoader } from 'nextjs-progressloader';
```

### Usage with `app/layout.js` for `app` folder structure

For rendering add `<ProgressLoader />` to your `return()` inside the `<body></body>` tag of `RootLayout()`:

```js
'use client';
import { ProgressLoader } from 'nextjs-progressloader';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProgressLoader />
        {children}
      </body>
    </html>
  );
}
```

### Usage with `pages/_app.js` for `pages` folder structure

For rendering add `<ProgressLoader />` to your `return()` in `MyApp()`:

```js
'use client';
import { ProgressLoader } from 'nextjs-progressloader';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProgressLoader />
      <Component {...pageProps} />;
    </>
  );
}
```

### Default Configuration

If no props are passed to `<ProgressLoader />`, below is the default configuration applied.

```jsx
<NextTopLoader
  color="#2299DD"
  initialPosition={0.1}
  crawlSpeed={200}
  height={3}
  crawl={true}
  showSpinner={true}
  easing="ease"
  speed={200}
  shadow="0 0 10px #2299DD,0 0 5px #2299DD"
  template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  zIndex={1600}
/>
```

- `color`: to change the default color of TopLoader.
- `initialPosition`: to change initial position for the TopLoader in percentage, : `0.08 = 8%`.
- `crawlSpeed`: increment delay speed in `ms`.
- `speed`: animation speed for the TopLoader in `ms`
- `easing`: animation settings using easing (a CSS easing string).
- `height`: height of TopLoader in `px`.
- `crawl`: auto incrementing behavior for the TopLoader.
- `showSpinner`: to show spinner or not.
- `shadow`: a smooth shadow for the TopLoader. (set to `false` to disable it)
- `template`: to include custom HTML attributes for the TopLoader.
- `zIndex`: defines zIndex for the TopLoader.

---

## Advanced Usage

If you would like to render some route with the Load Animation, use `<ContainerLink />` component and `handleClickLink()` function to it:

When render `<ContainerLink />` you are required to pass a link prop which is responsible to create a event based on the current prop.
And when call `handleClickLink()`, a event is emitted event based on the param.

- Important and required: to work, the link prop and the function parameter must be equals.

### 1° usage

You can use the container and pass a children component inside.

```jsx
import { handleClickLink, ContainerLink } from 'nextjs-progressloader';

<ContainerLink link="/login">
  <button className="bg-red-500" onClick={() => handleClickLink('/login')}>
    Login
  </button>
</ContainerLink>;
```

### 2° usage

```jsx
import { handleClickLink, ContainerLink } from 'nextjs-progressloader';

function login() {
  // your needed validation here

  //navigating
  handleClickLink('/login');
}

return (
  <>
    <button className="bg-red-500" onClick={login}>
      Login
    </button>
    //use wherever you want
    <ContainerLink link="/login" />
  </>
);
```

`link`: string
