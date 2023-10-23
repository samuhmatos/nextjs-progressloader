import NextLink from 'next/link';
import React, { useEffect, useRef } from 'react';
import { onEventEmitter, removeEvent } from '../services/eventsServices';
11;

export interface LinkProps {
  href: string;
  nickname?: string;
}

export function Link(linkProps: LinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    onEventEmitter(linkProps, () => {
      linkRef.current?.click();
      removeEvent(linkProps);
    });
  }, []);

  return (
    <NextLink href={linkProps.href} ref={linkRef} style={{ display: 'none' }} />
  );
}

// eventEmitter.on(`route-${href}`, () => {
//   linkRef.current?.click();
// });

// if (nickname) {
//   eventEmitter.on(`route-${nickname}`, () => {
//     linkRef.current?.click();
//   });
// }

// return () => {
//   eventEmitter.removeAllListeners(`route-${href}`);

//   if (nickname) {
//     eventEmitter.removeAllListeners(`route-${nickname}`);
//   }
// };
