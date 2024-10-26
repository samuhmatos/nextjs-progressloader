import NextLink from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { eventsService } from '../services/eventsServices';
import { LinkProps } from '../types';
import { routeService } from '../services/routeService';

export function Link(linkProps: LinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [link, setLink] = useState<string>(linkProps.href);

  useEffect(() => {
    eventsService.eventListener.on(linkProps, (event) => {
      var newLink = linkProps.href;

      if (routeService.matchDynamicRoute(linkProps.href, event?.dynamicRoute)) {
        newLink = routeService.replaceDynamicValues(
          linkProps.href,
          event?.dynamicRoute
        );
      }

      if (event?.queryStrings && event.queryStrings.length > 0) {
        newLink += routeService.generateQueryString(event.queryStrings);
      }

      if (newLink !== link) {
        setLink(newLink);
      }

      if (event?.open === 'newTab') {
        open(newLink, '_blank');
        return;
      }

      setTimeout(() => {
        linkRef.current?.click();
      }, 1);
    });

    return () => {
      eventsService.eventListener.remove(linkProps);
    };
  }, [linkProps]);

  return <NextLink href={link} ref={linkRef} style={{ display: 'none' }} />;
}
