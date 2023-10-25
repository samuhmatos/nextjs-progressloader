import React from 'react';
import { Link } from './Link';
import { existEvent } from '../services/eventsServices';
import { ContainerLinkProps } from '../types';

export function ContainerLink({ links }: ContainerLinkProps) {
  return (
    <div>
      {links.map((link) => {
        if (existEvent(links, link)) {
          throw new Error(
            `The href '${link.href}' or nickname '${link.nickname}' already exist in the list!`
          );
        }

        return (
          <Link href={link.href} nickname={link.nickname} key={link.href} />
        );
      })}
    </div>
  );
}
