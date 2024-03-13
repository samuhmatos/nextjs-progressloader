# Changelogs

## v1.2.0

### Updated

- Now ContainerLink has support to register a external link like (https://github.com/samuhmatos)
  don't forget to check out the [rules](docs/Usability%20flow.md)

## v1.0.0

### Added

- Added the new and upgraded useRouter() hook. It is possible using all the useRouter() native features with animation (push, replace, back)

### Updated

- changeRoute() function is deprecated, use the new useRouter() hook

## v0.1.8

### Added

- Added possibility to add query string to the called route using `changeRoute()`

### Fixed

- Fixed the event wasn't removed on change route bug

## v0.2.1

### Fixed

- Fixed the queryString bug when a route didn't have a dynamic route.

## v0.2.0

### Added

- Added the ability to use dynamic routes using `{key here}`:
  - Passing when is registering the route, ex.:
    ```
    {href: "/route/to/{key}", nickname:"route"}
    ```
  - Call the route, Ex.:
    ```
    changeRoute("route", {
        dynamicRoute: [
            {key: "key", value: "dynamic-route"}
        ]
    })
    ```

### Updated

- Validating the url if is valide for using.
- The `params` key passed in `changeRoute()` now has the name `queryStrings`

## v0.1.9

### Added

- Added the ability to open link in a new Tab using then `changeRoute()`
