'use client';
import NextLink from 'next/link';
import { useEffect, useRef } from 'react';
import React from 'react';
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

export function handleClickLink(link: string) {
  eventEmitter.emit(`on-click-link-${link}`);
}

interface ContainerLinkProps {
  children?: React.ReactNode;
  link: string;
}

export function ContainerLink({ children, link }: ContainerLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    eventEmitter.on(`on-click-link-${link}`, () => {
      linkRef.current?.click();
    });

    return () => {
      eventEmitter.removeAllListeners(`on-click-link-${link}`);
    };
  }, []);

  return (
    <div>
      {children}
      <NextLink href={link} ref={linkRef} style={{ display: 'none' }} />
    </div>
  );
}
