import React from 'react';
import { useState } from 'react';
import { useLayoutEffect } from 'react';

import { styled } from '@/libs/stitches';

export type TabProp = {
	children: React.ReactElement<TabItem> | React.ReactElement<TabItem>[]
	value?: string;
	onChange?: (newValue: string) => void;
};

export type TabItem = {
	value: string;
	children: string;
};

export const TabItem: React.FC<TabItem> = (p: TabItem) => {
  return {
    props: p,
    key: null,
    type: null,
  };
};

const Container = styled('div', {
  position: 'relative',
});

const Ul = styled('ul', {
  display: 'flex',
  margin: 0,
  padding: 0,
});

const Li = styled('li', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$m',
  margin: 0,
  borderBottom: '2px solid $muted',
  color: '$muted',

  variants: {
    active: {
      true: {
        color: '$primary',
      },
    },
  },
});

export const Tab: React.FC<TabProp> = (p) => {
  const c = Array.isArray(p.children) ? p.children.map(c => c.props) : [p.children.props];
  const [value, setValue] = useState(c[0].value);

  useLayoutEffect(() => {
    if (!p.value) return;
    setValue(p.value);
  }, [p.value]);

  return (
    <Container>
      <Ul>
        {c.map(item => (
          <Li key={item.value} role="button" active={item.value === value} onClick={() => {
            if (item.value === value) return;
            console.log(item.value);
            setValue(item.value);
            p.onChange?.(item.value);
          }}>
            {item.children}
          </Li>
        ))}
      </Ul>
    </Container>
  );
};
