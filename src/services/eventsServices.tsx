import { EventEmitter } from 'events';
import { ChangeRouteProps, LinkProps } from '../types';
export const eventEmitter = new EventEmitter();

export function existEvent(links: LinkProps[], { href, nickname }: LinkProps) {
  var passedLink = links.filter(
    (link) => link.href === href || (nickname && link.nickname === nickname)
  );

  if (
    passedLink.length > 1 ||
    eventEmitter.listenerCount(`route-${nickname}`) > 1 ||
    eventEmitter.listenerCount(`route-${href}`) > 1
  ) {
    return true;
  }

  return false;
}

export function changeRoute(
  RouteName: string,
  params?: ChangeRouteProps
): void {
  var eventCalled = eventEmitter.emit(`route-${RouteName}`, params);

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

export const eventListener = {
  on: onEventListener,
  remove: removeEventListener,
};
