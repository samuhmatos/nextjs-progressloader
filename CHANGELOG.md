# Changelogs

## v0.1.8

### Added

- Added possibility to add query string to the called route using `changeRoute()`

### Fixed

- Fixed the event wasn't removed on change route bug

## v0.1.9

### Added

- Added the ability to open link in a new Tab using then `changeRoute()`

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
