import NextLink from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { eventListener } from '../services/eventsServices';
import { LinkProps } from '../types';

export function Link(linkProps: LinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [link, setLink] = useState<string>(linkProps.href);
  const [target, setTarget] = useState<'_blank' | undefined>();

  useEffect(() => {
    eventListener.on(linkProps, (event) => {
      let query = '';

      if (event?.params && event.params?.length > 0) {
        event.params.forEach((param, index) => {
          var qy = `${param.query}=${param.value}`;

          if (index === 0) {
            query = '?' + qy;
          } else {
            query += '&&' + qy;
          }
        });

        setLink(linkProps.href + query);
      }

      if (event?.event?.ctrlKey) {
        setTarget('_blank');
      } else if (event?.event?.shiftKey) {
        open(linkProps.href + query, '_blank');
        return;
      }

      setTimeout(() => {
        linkRef.current?.click();
      }, 1);
    });

    return () => {
      eventListener.remove(linkProps);
    };
  }, [linkProps]);

  useEffect(() => {
    if (target === '_blank') {
      setTimeout(() => {
        setTarget(undefined);
      }, 1);
    }
  }, [target]);

  return (
    <NextLink
      href={link}
      ref={linkRef}
      style={{ display: 'none' }}
      target={target}
    />
  );
}
