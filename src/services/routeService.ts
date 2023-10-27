import { DynamicRoute, QueryStringProps } from '../types';

function validateRoute(
  route: string,
  regex: RegExp,
  routeType: 'nickname' | 'href'
): boolean {
  if (route.includes('{}')) {
    throw new Error(
      `Invalid route: Then '${route}' Route contains '{}', but no parameters were provided.`
    );
  }

  const openParenthesesCount = (route.match(/\{/g) || []).length;
  const closeParenthesesCount = (route.match(/\}/g) || []).length;

  if (openParenthesesCount === closeParenthesesCount && regex.test(route)) {
    return true;
  } else {
    if (routeType === 'nickname') {
      throw new Error(
        `invalid nickname: The '${route}' nickname contains invalid characters. Only uppercase end lowercase letters, numbers, and the following special characters are allowed: ( !, @, #, $, %, &, -, _, ?. ).`
      );
    }

    throw new Error(
      `Invalid route: The route '${route}' can only contain letters, numbers, hyphens (-), underscores (_), slashes (/), and braces ({}).`
    );
  }
}

function isAValidHrefRoute(route: string) {
  if (route === '/') {
    return true;
  }

  if (route[0] !== '/') {
    throw new Error(`Invalid route: The '${route}' route must begin with '/'`);
  }

  const regex = /^\/(([a-zA-Z0-9-_]+|\{[a-zA-Z0-9-_,]+\})\/?)+$/;

  return validateRoute(route, regex, 'href');
}

function isAValidNicknameRoute(route: string) {
  const regex = /^[a-zA-Z0-9!@#$%&\-_?.]+$/;

  return validateRoute(route, regex, 'nickname');
}

function isValidStringForURL(str: string) {
  var pattern = /^[a-zA-Z0-9_-]+$/;

  return pattern.test(str);
}

function matchDynamicRoute(
  absoluteUrl: string,
  dynamicValues?: DynamicRoute[]
): boolean {
  if (absoluteUrl === '/') {
    return true;
  }

  if (
    !dynamicValues &&
    absoluteUrl.includes('{') &&
    absoluteUrl.includes('}')
  ) {
    throw new Error(
      `Missing 'dynamicValues' parameter, but the ${absoluteUrl} route contains dynamic keys.`
    );
  }

  const absoluteRouteParts = absoluteUrl.split('/');

  const dynamicKeys = dynamicValues?.map((dynamicValue) => {
    if (!isValidStringForURL(dynamicValue.value.toString())) {
      throw new Error(
        `The dynamicValue (${dynamicValue.value}) of '${dynamicValue.key}' key contains invalid characters. Use only letters, numbers, underscores (_) and hyphens (-). Spaces and other characters are not allowed`
      );
    }

    return `{${dynamicValue.key}}`;
  });

  const routeDynamicKeys = absoluteRouteParts.filter(
    (part) => part.includes('{') && part.includes('}')
  );

  const dynamicKeysSet = new Set(dynamicKeys);

  if (routeDynamicKeys.length !== dynamicValues?.length) {
    throw new Error(
      'The number of dynamic keys in the route does not match the number of dynamic values specified.'
    );
  }

  for (const part of routeDynamicKeys) {
    if (!dynamicKeysSet.has(part)) {
      throw new Error(
        `The dynamic route '${part}' passed was not found in dynamicValues. Please check which prams are available!`
      );
    }
  }

  return true;
}

function replaceDynamicValues(
  absoluteUrl: string,
  dynamicValues?: DynamicRoute[]
): string {
  let substitutedUrl = absoluteUrl;

  if (dynamicValues) {
    for (const dynamicValue of dynamicValues) {
      const key = `{${dynamicValue.key}}`;
      const value = dynamicValue.value;

      substitutedUrl = substitutedUrl.replace(
        new RegExp(escapeRegExp(key), 'g'),
        value.toString()
      );
    }
  }

  return substitutedUrl;
}

function escapeRegExp(key: string) {
  return key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateQueryString(queryStrings: QueryStringProps[]): string {
  let query = '';
  queryStrings.forEach((param, index) => {
    var qy = `${param.key}=${param.value}`;

    if (index === 0) {
      query = '?' + qy;
    } else {
      query += '&&' + qy;
    }
  });

  return query;
}

export const routeService = {
  isAValidHrefRoute,
  matchDynamicRoute,
  replaceDynamicValues,
  generateQueryString,
  isAValidNicknameRoute,
};
