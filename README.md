# Next Js Progress Loader

- A next Js Loading Bar component made using Nprogress, works with Next.js 13.
- Advanced feature: Navigate between routes with loading animation instead using useRouter()

Important context: Latter the Next.Js 13 update, router events has ben depreciated and still there's no 'next native resource' to manipulate router events as before. But this lib was build to solve this problem and bring a new way to make the UX better!

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

If you would like to render some route with the Load Animation, use `<ContainerLink />` component and `changeRoute()` function to do it:

When render `<ContainerLink />` you are required to pass a `links` prop which is responsible to create all the needed events to work.

And when using `changeRoute()` a event will be emitted based on the function's param.

- **Important and required**: To this feature work correctly, the `links` prop and the function's parameter must be equals.
- You can render the component as many times as you want and anywhere you want, being inside the `<body></body>`
- Using the `<ContainerLink />` next will identify the routes and will pre-render: verify the doc https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching

Once the links are defined, you can call the route wherever and whenever you want! You may call using the nickname or href

### Example usage

```jsx
import { changeRoute, ContainerLink, ContainerLinkProps } from 'nextjs-progressloader';

const links: ContainerLinkProps["links"] = [
  {
    href: "/",
    nickname: "home",
  },
  {
    href: "/posts",
    nickname: "posts"
  },
  {
    href: "/dashboard",
    nickname: "dashboard"
  },
];

<ContainerLink links={links} />;

<button className="bg-red-500" onClick={()=> changeRoute("dashboard")}>
  Open dashboard route by nickname
</button>
<button className="bg-red-500" onClick={()=> changeRoute("/dashboard")}>
  Open dashboard route by href
</button>
```

`link`: string
`nickname`: string

- `link`: href of the route
- `nickname`: short name, nickname, route name... Whatever you want to set to open the route easily
