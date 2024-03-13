# Usability flow

### All the possible usages

In the examples bellow, you will see all the possibles ways to generate links (using the rules) and invoke them.

Using the `<ContainerLink />` with our custom `useRouter()` hook you can:

- Use dynamic routes
- Use Query strings
- Open in a new tab or in a new window

With our custom useRouter() you can use all the next's useRouter feature with loading animation.

```tsx
import {
  useRouter,
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
  const router = useRouter();

  // calling route with dynamic values
  function callWithDynamicRoute() {
    // calling the nickname
    router.push('posts.details', {
      dynamicRoute: [{ key: 'slug', value: 'post-title' }],
    });

    // /posts/post-title
  }

  // calling route with query string
  function callWithQueryStrings() {
    // calling the nickname
    router.push('posts', {
      queryStrings: [{ key: 'page', value: '1' }],
    });
    // /posts?page=1
  }

  // calling route and opening in a new tab/ browser window
  function callOpeningInNewTab() {
    // calling the href
    router.push('/profile', {
      open: 'newTab',
    });
  }

  function usingAllTheResources() {
    // calling the nickname

    router.push('posts.details', {
      open: 'newTab',
      dynamicRoute: [{ key: 'slug', value: 'post-title' }],
      queryStrings: [{ key: 'page', value: '1' }],
    });

    // /posts/post-title?page=1 IN  (A NEW TAB)
  }

  function usingBackOrReplace(){

    if(/*some validation */){
      router.replace('profile')
    }else{
      router.back()
    }
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
    - Allowed: The 'href' route may contain letters, numbers, hyphens -, underscores \_, slashes /, dots (.), colons (:), and curly braces {} used to delimit parameters.
    - Disallowed: Any character not listed above is prohibited in the 'href' route. Additionally, curly braces {} must be used in balanced pairs (open and close) and cannot be unbalanced. If a route contains unbalanced curly braces {} or other disallowed characters, it will result in an error.
  - **nickname**:
    - Allowed: The 'nickname' route can only contain uppercase and lowercase letters, numbers, and the following special characters: ( `!`, `@`, `#`, `$`, `%`, `&`, `-`, \_, `.` , `?` ).
    - Disallowed: Any other character not listed above will result in an error.

### Rules for invoking a route

When invoking the route, developers must adhere to the following rules:

- **DynamicRoute**:
  - if the **href** route was created with dynamic segments,you are obligated to provide the corresponding dynamic values.
  - The **values** supplied to the function may only include: letters, numbers, underscores (\_), dots (.) and hyphens (-). Spaces and other characters are not allowed.
  - The number of dynamic keys/values passed in the function must match the number of dynamic values specified in the route.
  - The dynamic keys provided in the called function must correspond to the dynamic values specified in the route.
