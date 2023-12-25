import * as NProgress from 'nprogress';
import { MouseEvent as ReactMouseEvent } from 'react';

export const progress = {
  done: () => {
    var npgclass = document.querySelectorAll('html');

    NProgress.done();
    [].forEach.call(npgclass, function (el: Element) {
      el.classList.remove('nprogress-busy');
    });
  },
  start: () => {
    NProgress.start();
  },
};

function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string) {
  const currentUrlObj = new URL(currentUrl);
  const newUrlObj = new URL(newUrl);
  // Compare hostname, pathname, and search parameters
  if (
    currentUrlObj.hostname === newUrlObj.hostname &&
    currentUrlObj.pathname === newUrlObj.pathname &&
    currentUrlObj.search === newUrlObj.search
  ) {
    // Check if the new URL is just an anchor of the current URL page
    const currentHash = currentUrlObj.hash;
    const newHash = newUrlObj.hash;
    return (
      currentHash !== newHash &&
      currentUrlObj.href.replace(currentHash, '') ===
        newUrlObj.href.replace(newHash, '')
    );
  }
  return false;
}

function findClosestAnchor(
  element: HTMLElement | null
): HTMLAnchorElement | null {
  while (element && element.tagName.toLowerCase() !== 'a') {
    element = element.parentElement;
  }
  return element as HTMLAnchorElement;
}

function isExternalLink(
  event: MouseEvent | ReactMouseEvent,
  currentAnchor: HTMLAnchorElement
): boolean {
  if (
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    currentAnchor.target === '_blank'
  )
    return true;

  return false;
}

export function handleClick(event: MouseEvent) {
  try {
    const target = event.target as HTMLElement;
    const anchor = findClosestAnchor(target);
    if (anchor) {
      if (isExternalLink(event, anchor)) return;

      const currentUrl = window.location.href;
      const newUrl = (anchor as HTMLAnchorElement).href;
      const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl);

      if (newUrl === currentUrl || isAnchor) {
        progress.start();
        progress.done();
      } else {
        progress.start();
        (function (history) {
          const pushState = history.pushState;
          history.pushState = function () {
            progress.done();

            return pushState.apply(history, arguments as any);
          };
        })(window.history);
      }
    }
  } catch (err) {
    // Log the error in development only!
    console.log('NextTopLoader error: ', err);
    progress.start();
    NProgress.done();
  }
}
