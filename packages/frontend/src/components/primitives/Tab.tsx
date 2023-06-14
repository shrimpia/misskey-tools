import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';


import { styled } from '@/libs/stitches';

export type TabProp = {
	children: React.ReactElement<TabItem> | React.ReactElement<TabItem>[]
	value?: string;
	direction?: 'vertical' | 'horizontal';
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

  defaultVariants: {
    direction: 'horizontal',
  },

  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
  },
});

const Li = styled('li', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$s $l',
  margin: 0,
  color: '$muted',

  defaultVariants: {
    direction: 'horizontal',
  },

  variants: {
    active: {
      true: {
        color: '$primary',
      },
    },

    direction: {
      horizontal: {
        borderBottom: '2px solid $divider',
      },
      vertical: {
        borderLeft: '2px solid $divider',
        justifyContent: 'flex-start',
      },
    },
  },
});

const Indicator = styled('div', {
  position: 'absolute',
  background: '$primary',
  transition: 'all 0.2s $timingFunction$default',

  defaultVariants: {
    direction: 'horizontal',
  },

  variants: {
    direction: {
      horizontal: {
        bottom: 0,
        height: 2,
      },
      vertical: {
        left: 0,
        width: 2,
      },
    },
  },
});

export const Tab: React.FC<TabProp> = (p) => {
  const items = useMemo(() => Array.isArray(p.children) ? p.children.map(c => c.props) : [p.children.props], [p.children]);

  const [value, setValue] = useState<string | null>(null);

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const position = useMemo(() => {
    let sum = 0;
    const max = items.findIndex(item => item.value === value);
    for (let i = 0; i < max; i++) {
      const ref = itemRefs.current[i];
      if (ref == null) return 0;
      sum += p.direction === 'vertical' ? ref.clientHeight : ref.clientWidth;
    }
    console.log(`left: ${sum}`);
    return sum;
  }, [items, p.direction, value]);

  const size = useMemo(() => {
    const i = items.findIndex(item => item.value === value);
    const ref = itemRefs.current[i];
    if (ref == null) return 0;
    return p.direction === 'vertical' ? ref.clientHeight : ref.clientWidth;
  }, [items, p.direction, value]);

  const indicatorStyle = useMemo(() => (p.direction === 'vertical' ? {
    top: position, height: size,
  }: {
    left: position, width: size,
  }), [p.direction, position, size]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
    if (value === null) {
      setValue(items[0].value);
    }
  }, [items, value]);

  useLayoutEffect(() => {
    if (!p.value) return;
    setValue(p.value);
  }, [p.value]);

  return (
    <Container>
      <Ul direction={p.direction}>
        {items.map((item, i) => (
          <Li direction={p.direction} key={item.value} ref={el => itemRefs.current[i] = el} role="button" active={item.value === value} onClick={() => {
            if (item.value === value) return;
            console.log(item.value);
            setValue(item.value);
            p.onChange?.(item.value);
          }}>
            {item.children}
          </Li>
        ))}
      </Ul>
      <Indicator aria-hidden direction={p.direction} css={indicatorStyle} />
    </Container>
  );
};
