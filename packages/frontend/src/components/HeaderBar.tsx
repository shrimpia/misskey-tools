import React from 'react';

import { Centered } from '@/components/layouts/Centered.js';
import { Button } from '@/components/primitives/Button.js';
import { styled } from '@/libs/stitches.js';

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
  i: {
    fontSize: '$2xl',
  },
});

const AccountButton = styled(Button, {
  height: 32,
  fontWeight: 'normal',
});

const Title = styled(Centered, {
  position: 'absolute',
  inset: 0,
  fontSize: '$xl',
  color: '$headerBarTitleFg',
  fontFamily: 'OTADESIGN Rounded',
  pointerEvents: 'none',
});

const Spacer = styled('div', {
  flex: 1,
});

export const HeaderBar: React.FC = () => {
  return (
    <Container>
      <Title>Misskey Tools</Title>
      <AppMenuButton flat>
        <i className="ti ti-grid-dots"/>
      </AppMenuButton>
      <Spacer/>
      <AccountButton flat>
				Lutica&nbsp;<i className="ti ti-chevron-down"/>
      </AccountButton>
    </Container>
  );
};
