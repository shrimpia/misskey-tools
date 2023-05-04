import React from 'react';
import { NavLink } from 'react-router-dom';

import type { MenuItemWithoutNesting } from '@/models/menu';

import { styled } from '@/libs/stitches';

const Item = styled('div', {
  padding: '$xs $s',
  borderRadius: '$2',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1,
  color: 'inherit',
  textDecoration: 'none',
  textAlign: 'left',
  width: '100%',

  '> .icon': {
    marginRight: '$xs',
  },

  '> .right': {
    marginLeft: 'auto',
    paddingLeft: '$m',
  },

  '&.active': {
    backgroundColor: '$primaryA',
    color: '$primary',
    outline: 'none',
  },

  '&:hover': {
    color: '$primary',
    outline: 'none',
  },

  '@phone': {
    lineHeight: 1.8,
  },
});

const Separator = styled('div', {
  margin: '$m $xs',
});

const Heading = styled('h1', {
  padding: '$m $xs',
  fontSize: '$xs',
  color: '$muted',
});


const MenuItemComponent: React.FC<{item: MenuItemWithoutNesting}> = ({ item }) => {
  switch (item.type) {
    case 'link':
      return (
        <Item as={NavLink} to={item.href} className={({ isActive }) => isActive ? 'active' : ''}>
          {item.iconClassName && <i className={`icon ${item.iconClassName}`}/>}
          {item.label}
        </Item>
      );
    case 'button':
      return (
        <Item as="button" onClick={item.onClick}>
          {item.iconClassName && <i className={`icon ${item.iconClassName}`}/>}
          {item.label}
        </Item>
      );
    case 'heading':
      return <Heading>{item.label}</Heading>;
    case 'separator':
      return <Separator />;
    default:
      return null;
  }
};

export type MenuProp = {
	items: MenuItemWithoutNesting[];
};

export const Menu: React.FC<MenuProp> = (p) => {
  return <div>{p.items.map((item, i) => <MenuItemComponent key={i} item={item}/>)}</div>;
};
