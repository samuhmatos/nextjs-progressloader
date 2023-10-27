# Next Js Progress Loader

- [A next Js Loading Bar component made using Nprogress. Works with Next.js 13 and whatever another version.](#install)
- [Advanced feature: Navigate between routes with loading animation instead using useRouter()](#advanced-usage)

Important context: Latter the Next.Js 13 update, router events has ben depreciated and still there's no 'next native ressource' to manipulate router events as before. But this lib was build to solve this problem and bring a new way to make the UX better!

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

import the animation component:

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

##### [Learn more about `<ProgressLoader />`](docs/ProgressLoader.md)

## Advanced Usage

If you would like to render some route with the Load Animation, use `<ContainerLink />` component and `changeRoute()` function to do it:

When render `<ContainerLink />` you are required to pass a `links` prop which is responsible to create all the needed events to work.

And when using `changeRoute()` a event will be emitted based on the function's param.

- **Important and required**: To this feature work correctly, the `links` prop and the function's parameter must be equals.
- You can render the component as many times as you want and anywhere you want, being inside the `<body></body>`
- Using the `<ContainerLink />` next will identify the routes and will pre-render: verify the doc https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#1-prefetching

Once the links are defined, you can call the route wherever and whenever you want! You may call using the nickname or href.

##### [Learn everything about the Usability flow](docs/Usability%20flow.md)

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
    href: "/login",
  },
];

export function ComponentIWantToRender(){

  function validateSomeThing(){
    // your validation

    //Example
    if(userLogged){
      // calling by the nickname
      changeRoute("home")
    }else{
      //calling by the route
      changeRoute("/login")
    }
  }

  return (
    <>
      <ContainerLink links={links} />;

      <button className="bg-red-500" onClick={validateSomeThing}>
        Validating something
      </button>
    </>
  )
}
```

##### [Learn everything about the Usability flow](docs/Usability%20flow.md)
