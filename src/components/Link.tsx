import NextLink from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { onEventEmitter, removeEvent } from '../services/eventsServices';

export interface LinkProps {
  href: string;
  nickname?: string;
}

export function Link(linkProps: LinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [link, setLink] = useState<string>(linkProps.href);
  const [target, setTarget] = useState<'_blank'>();

  useEffect(() => {
    onEventEmitter(linkProps, (event, params) => {
      let query = '';

      if (params && params.length > 0) {
        params?.forEach((param, index) => {
          var qy = `${param.query}=${param.value}`;

          if (index === 0) {
            query = '?' + qy;
          } else {
            query += '&&' + qy;
          }
        });

        setLink(linkProps.href + query);
      }

      if (event.ctrlKey) {
        setTarget('_blank');
      } else if (event.shiftKey) {
        open(linkProps.href + query, '_blank');
        return;
      }

      setTimeout(() => {
        linkRef.current?.click();
        removeEvent(linkProps);
      }, 1);
    });
  }, []);

  return (
    <NextLink
      href={link}
      ref={linkRef}
      style={{ display: 'block' }}
      target={target}
    >
      {link}
    </NextLink>
  );
}

// return () => {
//   eventEmitter.removeAllListeners(`route-${href}`);

//   if (nickname) {
//     eventEmitter.removeAllListeners(`route-${nickname}`);
//   }
// };
