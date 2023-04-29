import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Centered } from '@/components/layouts/Centered.js';
import { Button } from '@/components/primitives/Button.js';
import { PopupMenu } from '@/components/primitives/PopupMenu.js';
import { styled } from '@/libs/stitches.js';
import { MenuItem } from '@/models/menu.js';


const Container = styled('header', {
  display: 'flex',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 40,
  padding: '0 $m',
  color: '$headerBarFg',
  background: '$headerBarBg',
  alignItems: 'center',
  zIndex: '$floating',
  backdropFilter: 'blur(32px)',
});

const AppMenuButton = styled(Button, {
  width: 32,
  height: 32,
  zIndex: '$floating',
  i: {
    fontSize: '$2xl',
  },
});

const AccountButton = styled(Button, {
  height: 32,
  fontWeight: 'normal',
  zIndex: '$floating',
});

const Title = styled(Centered, {
  position: 'absolute',
  inset: 0,
  fontSize: '$xl',
  color: '$headerBarTitleFg',
  fontFamily: 'OTADESIGN Rounded',

  '> a': {
    color: 'inherit',
    textDecoration: 'none',
  },
});

const Spacer = styled('div', {
  flex: 1,
});

export const HeaderBar: React.FC = () => {
  const { t } = useTranslation();

  const menuItems = useMemo(() => [{
    type: 'link',
    label: t('misskeyAccounts'),
    href: '/accounts',
    iconClassName: 'ti ti-users',
  },{
    type: 'link',
    label: t('settings'),
    href: '/settings',
    iconClassName: 'ti ti-settings',
  },{
    type: 'link',
    label: t('helpAndSupport'),
    href: '/help',
    iconClassName: 'ti ti-help-circle',
  }] as MenuItem[], [t]);

  return (
    <Container>
      <Title>
        <Link to="/">Misskey Tools</Link>
      </Title>
      <AppMenuButton flat>
        <i className="ti ti-grid-dots"/>
      </AppMenuButton>
      <Spacer/>
      <PopupMenu items={menuItems}>
        <AccountButton flat>
					Lutica
        </AccountButton>
      </PopupMenu>
    </Container>
  );
};
