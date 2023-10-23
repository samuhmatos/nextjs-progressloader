import { EventEmitter } from 'events';
import { LinkProps } from '../components/Link';
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

export function changeRoute(name: string): void {
  eventEmitter.emit(`route-${name}`);
}

export function onEventEmitter(
  { href, nickname }: LinkProps,
  callbackFn: () => void
): void {
  eventEmitter.on(`route-${href}`, () => {
    callbackFn();
  });

  if (nickname) {
    eventEmitter.on(`route-${nickname}`, () => {
      callbackFn();
    });
  }
}

export function removeEvent({ href, nickname }: LinkProps): void {
  eventEmitter.removeAllListeners(`route-${href}`);

  if (nickname) {
    eventEmitter.removeAllListeners(`route-${nickname}`);
  }
}

// TODO: CHANGE ROUTE VALIDATE IF EXIST ROUTE
