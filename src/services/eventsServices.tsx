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
  params?: QueryStringProps[],
  event?: MouseEvent
): void {
  eventEmitter.emit(`route-${name}`, params, event);
}

function emitEvent(
  name: string,
  callbackFn: (params?: QueryStringProps[], event?: MouseEvent) => void
) {
  eventEmitter.on(
    `route-${name}`,
    (params?: QueryStringProps[], event?: MouseEvent) => {
      callbackFn(params, event);
    }
  );
}

export function onEventEmitter(
  { href, nickname }: LinkProps,
  callbackFn: (params?: QueryStringProps[], event?: MouseEvent) => void
): void {
  emitEvent(href, callbackFn);

  if (nickname) {
    emitEvent(nickname, callbackFn);
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
//FIXME: CLICKING, THE SAME BUTTON CANT CLICK MORE (EXEMPLE: CRIAR USUARIO BUTTON IN DASHBOARD OF THE BLOG)
