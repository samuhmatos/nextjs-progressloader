import { EventEmitter } from 'events';
import { LinkProps } from '../components/Link';
import { MouseEvent } from 'react';
export const eventEmitter = new EventEmitter();

export function existEvent(links: LinkProps[], { href, nickname }: LinkProps) {
  var existLink = links.filter(
    (link) => link.href === href || (nickname && link.nickname === nickname)
  );

  if (existLink.length > 1) {
    return true;
  }

  return false;
}

export interface QueryStringProps {
  query: string;
  value: string;
}

export function changeRoute(
  name: string,
  event: MouseEvent,
  params?: QueryStringProps[]
): void {
  eventEmitter.emit(`route-${name}`, event, params);
}

export function onEventEmitter(
  { href, nickname }: LinkProps,
  callbackFn: (event: MouseEvent, params?: QueryStringProps[]) => void
): void {
  eventEmitter.on(`route-${href}`, (event, params?: QueryStringProps[]) => {
    callbackFn(event, params);
  });

  if (nickname) {
    eventEmitter.on(
      `route-${nickname}`,
      (event, params?: QueryStringProps[]) => {
        callbackFn(event, params);
      }
    );
  }
}

export function removeEvent({ href, nickname }: LinkProps): void {
  eventEmitter.removeListener(`route-${href}`, () => {});

  if (nickname) {
    eventEmitter.removeListener(`route-${nickname}`, () => {});
  }
}

// TODO: CHANGE ROUTE VALIDATE IF EXIST ROUTE
// TODO: LATTER CALL LISTENER, REMOVE (REMOVELISTENER OR ONCE EVENT (prepend once))
//TODO: ADD PARAMS IN THE ROUTE LIKE QUERY STRINGS
//FIXME: CLICKING, THE SAME BUTTON CANT CLICK MORE (EXEMPLE: CRIAR USUARIO BUTTON IN DASHBOARD OF THE BLOG)
