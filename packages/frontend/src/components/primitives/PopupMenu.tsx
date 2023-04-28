import * as $ from '@radix-ui/react-dropdown-menu';
import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { slideDownAndFade } from '../keyframes/slide-down-and-fade';
import { slideLeftAndFade } from '../keyframes/slide-left-and-fade';
import { slideRightAndFade } from '../keyframes/slide-right-and-fade';
import { slideUpAndFade } from '../keyframes/slide-up-and-fade';

import { css, styled } from '@/libs/stitches';
import { MenuItem } from '@/models/menu';

export type PopupMenuProp = PropsWithChildren<{
	items: MenuItem[];
}>;

const containerStyle = css({
  background: '$card',
  borderRadius: '$2',
  boxShadow: '$m',
  padding: '$xs',

  animationDuration: '300ms',
  animationTimingFunction: '$timingFunction$default',
  willChange: 'transform, opacity',
  zIndex: '$popup',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
});

const itemStyle = css({
  padding: '$xs $s',
  borderRadius: '$2',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  lineHeight: 1,
  textAlign: 'left',

  '> .icon': {
    marginRight: '$xs',
  },

  '> .right': {
    marginLeft: 'auto',
    paddingLeft: '$m',
  },

  '&[data-disabled]': {
    color: '$muted',
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    backgroundColor: '$primaryA',
    color: '$primary',
    outline: 'none',
  },
});

const Content = styled($.Content, containerStyle);
const Item = styled($.Item, itemStyle);
const SubContent = styled($.SubContent, containerStyle);

const SubItem = styled($.SubTrigger, itemStyle, {
  '&[data-state="open"]': {
    backgroundColor: '$primaryA',
    color: '$primary',
    outline: 'none',
  },
});

const Separator = styled($.Separator, {
  margin: '$2xs $xs',
});

const Label = styled($.Label, {
  padding: '$2xs $xs',
  fontSize: '$xs',
  color: '$muted',
});

const MenuItemComponent: React.FC<{item: MenuItem}> = ({ item }) => {
  switch (item.type) {
    case 'link':
      return (
        <Link to={item.href} className={css({ all: 'unset' })()}>
          <Item disabled={item.disabled}>
            {item.iconClassName && <i className={`icon ${item.iconClassName}`}/>}
            {item.label}
          </Item>
        </Link>
      );
    case 'button':
      return (
        <Item disabled={item.disabled} role="button" onClick={item.onClick}>
          {item.iconClassName && <i className={`icon ${item.iconClassName}`}/>}
          {item.label}
        </Item>
      );
    case 'heading':
      return (
        <Label>
          {item.label}
        </Label>
      );
    case 'separator':
      return <Separator />;
    case 'sub':
      return (
        <$.Sub>
          <SubItem disabled={item.disabled}>
            {item.iconClassName && <i className={`icon ${item.iconClassName}`}/>}
            {item.label}
            <div className="right">
              <i className="ti ti-chevron-right" />
            </div>
          </SubItem>
          <$.Portal>
            <SubContent>
              {item.items.map((item, i) => <MenuItemComponent key={i} item={item} />)}
            </SubContent>
          </$.Portal>
        </$.Sub>
      );
    default:
      return null;
  }
};

export const PopupMenu: React.FC<PopupMenuProp> = (p) => {
  return (
    <$.Root>
      <$.Trigger asChild>
        {p.children}
      </$.Trigger>

      <$.Portal>
        <Content>
          {p.items.map((item, i) => <MenuItemComponent key={i} item={item} />)}
        </Content>
      </$.Portal>
    </$.Root>
  );
};
