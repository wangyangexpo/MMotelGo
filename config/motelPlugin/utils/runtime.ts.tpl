import React from 'react';
import Provider from './Provider';

export function rootContainer(container: React.ReactNode, { routes }) {
  return React.createElement(Provider, { routes }, container);
}
