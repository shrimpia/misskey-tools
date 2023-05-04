import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import type { MenuItemLink, MenuItemWithoutNesting } from '@/models/menu';

import { HStack } from '@/components/layouts/HStack';
import { PageRoot } from '@/components/PageRoot';
import { Heading } from '@/components/primitives/Heading';
import { Menu } from '@/components/primitives/Menu';
import { SuspenseView } from '@/components/primitives/SuspenseView';
import { config, styled } from '@/libs/stitches';

const MenuWrapper = styled('div', {
  flexBasis: 240,
  minWidth: 0,

  '@phone': {
    flex: 1,
  },

  variants: {
    hasPage: {
      true: {
        '@phone': { display: 'none' },
      },
    },
  },
});

const PageWrapper = styled('div', {
  flex: 1,
  minWidth: 0,

  '@phone': {
    display: 'none',
  },

  variants: {
    hasPage: {
      true: {
        '@phone': { display: 'block' },
      },
    },
  },
});

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();

  const items = useMemo(() => [{
    type: 'link',
    href: '/settings/account',
    iconClassName: 'ti ti-user',
    label: t('accountSettings') ?? '',
  }, {
    type: 'link',
    href: '/settings/appearance',
    iconClassName: 'ti ti-palette',
    label: t('appearance') ?? '',
  }, {
    type: 'separator',
  }, {
    type: 'button',
    iconClassName: 'ti ti-logout',
    label: t('logout') ?? '',
  }] as MenuItemWithoutNesting[], [t]);

  const location = useLocation();
  const navigate = useNavigate();

  const hasSubPage = location.pathname.length > '/settings/'.length;

  // PCでこの画面を開いたとき、サブページがなければ強制的に開く
  useEffect(() => {
    if (hasSubPage) return;
    const q = window.matchMedia(config.media.phone);
    if (q.matches) return;

    navigate((items.filter(i => 'href' in i)[0] as MenuItemLink).href, { replace: true });
  }, [hasSubPage, items, navigate]);

  return (
    <PageRoot title={t('settings') ?? ''}>
      <HStack gap="l">
        <MenuWrapper hasPage={hasSubPage}>
          <Heading as="h1">{t('settings')}</Heading>
          <Menu items={items} />
        </MenuWrapper>
        <PageWrapper hasPage={hasSubPage}>
          <SuspenseView>
            <Outlet/>
          </SuspenseView>
        </PageWrapper>
      </HStack>
    </PageRoot>
  );
};

export default SettingsPage;
