import React from 'react';
import { Link } from './Link';
import { eventsService } from '../services/eventsServices';
import { ContainerLinkProps } from '../types';
import { routeService } from '../services/routeService';

export function ContainerLink({ links }: ContainerLinkProps) {
  return (
    <div>
      {links.map((link) => {
        if (eventsService.existEvent(links, link)) {
          throw new Error(
            `The href '${link.href}' or nickname '${link.nickname}' already exist in the local or global link list!`
          );
        }

        routeService.isAValidHrefRoute(link.href);
        if (link.nickname) {
          routeService.isAValidNicknameRoute(link.nickname);
        }

        return (
          <Link href={link.href} nickname={link.nickname} key={link.href} />
        );
      })}
    </div>
  );
}
