# Usability flow

### All the possible usages

In the examples bellow, you will see all the possibles ways to generate links (using the rules) and call them.

Using the `<ContainerLink />` with `changeRoute()` you can:

- Use dynamic routes
- Use Query strings
- Open in a new tab or in a new window

```tsx
import {
  changeRoute,
  ContainerLink,
  ContainerLinkProps,
} from 'nextjs-progressloader';

const links: ContainerLinkProps['links'] = [
  {
    href: '/posts/{slug}',
    nickname: 'posts.details',
  },
  {
    href: '/posts',
    nickname: 'posts',
  },
  {
    href: '/profile',
  },
];

export function ComponentIWantToRender() {
  // calling route with dynamic values
  function callWithDynamicRoute() {
    // calling the nickname
    changeRoute('posts.details', {
      dynamicRoute: [{ key: 'slug', value: 'post-title' }],
    });

    // /posts/post-title
  }

  // calling route with query string
  function callWithQueryStrings() {
    // calling the nickname
    changeRoute('posts', {
      queryStrings: [{ key: 'page', value: '1' }],
    });
    // /posts?page=1
  }

  // calling route and opening in a new tab/ browser window
  function callOpeningInNewTab() {
    // calling the href
    changeRoute('/profile', {
      open: 'newTab',
    });
  }

  function usingAllTheResources() {
    // calling the nickname

    changeRoute('posts.details', {
      open: 'newTab',
      dynamicRoute: [{ key: 'slug', value: 'post-title' }],
      queryStrings: [{ key: 'page', value: '1' }],
    });

    // /posts/post-title?page=1 IN  (A NEW TAB)
  }

  return (
    <>
      <ContainerLink links={links} />; ...rest of code
    </>
  );
}
```

### Props

- `links`
  - `link`: href of the route
  - `nickname`: short name, nickname, route name... Whatever you want setting to open the route easily

### Recommendations

- **if you would like to implement the dynamic route, you should set a nickname to can call it easier way.**

### Rules for the container creation

When creating the component, developers must adhere to the following rules:

- Validating if already exist the passed href or nickname. The validation will be made in every available containers in your project being global or local.
- Validating if the passed nickname and href follow the needed rules.
  - **href**:
    - Allowed: The 'href' route must start with a '/' and may contain letters, numbers, hyphens -, underscores \_, slashes /, and curly braces {} used to delimit parameters.
    - Disallowed: Any character not listed above is prohibited in the 'href' route. Additionally, curly braces {} must be used in balanced pairs (open and close) and cannot be unbalanced. If a route contains unbalanced curly braces {} or other disallowed characters, it will result in an error.
  - **nickname**:
    - Allowed: The 'nickname' route can only contain uppercase and lowercase letters, numbers, and the following special characters: ( !, @, #, $, %, &, -, \_, and ?. ).
    - Disallowed: Any other character not listed above will result in an error.

### Rules for call `changeRoute()`

When invoking the `changeRoute()` function, developers must adhere to the following rules:

- **DynamicRoute**:
  - if the **href** route was created with dynamic segments,you are obligated to provide the corresponding dynamic values.
  - The **values** supplied to the function may only include: letters, numbers, underscores (\_), and hyphens (-). Spaces and other characters are not permitted.
  - The number of dynamic keys/values passed in the function must match the number of dynamic values specified in the route.
  - The dynamic keys provided in the called function must correspond to the dynamic values specified in the route.
