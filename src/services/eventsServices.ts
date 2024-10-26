import { EventEmitter } from 'events';
import { ChangeRouteProps, LinkProps } from '../types';
export const eventEmitter = new EventEmitter();

function comparePassedLinks(
  links: LinkProps[],
  { href, nickname }: LinkProps
): boolean {
  var passedLink = links.filter(
    (link) =>
      link.href === href ||
      link.href + '/' === href ||
      (nickname && link.nickname === nickname)
  );

  var existEqualLinks: boolean = false;

  for (let index = 0; index < passedLink.length; index++) {
    let actualLink = passedLink[index];
    let nextLink = passedLink[index + 1];

    if (nextLink) {
      if (
        actualLink.href === nextLink.href ||
        actualLink.nickname === nextLink.nickname
      ) {
        existEqualLinks = true;
        break;
      } else {
        if (
          actualLink.href[actualLink.href.length - 1] !== '/' &&
          actualLink.href + '/' === nextLink.href
        ) {
          existEqualLinks = true;
          break;
        }

        existEqualLinks = false;
      }
    } else {
      existEqualLinks = false;
    }
  }

  return existEqualLinks;
}

function existEvent(links: LinkProps[], { href, nickname }: LinkProps) {
  var existEqualLinks = comparePassedLinks(links, { href, nickname });

  if (
    existEqualLinks === true ||
    eventEmitter.listenerCount(`route-${nickname}`) > 1 ||
    eventEmitter.listenerCount(`route-${href}`) > 1
  ) {
    return true;
  }

  return false;
}

/**
 * @deprecated Instead use the new useRouter() hook
 */
export function changeRoute(
  RouteName: string,
  params?: ChangeRouteProps
): void {
  var eventCalled = eventEmitter.emit(`route-${RouteName}`, params, []);

  if (!eventCalled) {
    throw new Error(
      `The route name '${RouteName}' is not registered in the local and global Container Link!`
    );
  }
}

function listenEmittedEvent(
  RouteName: string,
  callbackFn: (params?: ChangeRouteProps) => void
) {
  eventEmitter.addListener(
    `route-${RouteName}`,
    (params?: ChangeRouteProps) => {
      callbackFn(params);
    }
  );
}

function onEventListener(
  { href, nickname }: LinkProps,
  callbackFn: (params?: ChangeRouteProps) => void
): void {
  listenEmittedEvent(href, callbackFn);

  if (nickname) {
    listenEmittedEvent(nickname, callbackFn);
  }
}

function removeEventListener({ href, nickname }: LinkProps): void {
  eventEmitter.removeAllListeners(`route-${href}`);

  if (nickname) {
    eventEmitter.removeAllListeners(`route-${nickname}`);
  }
}

const eventListener = {
  on: onEventListener,
  remove: removeEventListener,
};

export const eventsService = {
  existEvent,
  eventListener,
};
