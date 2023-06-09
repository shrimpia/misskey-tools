import * as $ from '@radix-ui/react-alert-dialog';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { HStack } from '../layouts/HStack';

import { Button } from './Button';

import { styled, keyframes } from '@/libs/stitches';

export type AlertProp = {
	open: boolean;
	onOpenChange: (state: boolean) => void;
	title?: string;
	description: string;
	cancelText?: string;
	hasCancel?: boolean;
	okText?: string;
	danger?: boolean;
	onOkClick?: () => void;
};

export const Alert: React.FC<AlertProp> = (p) => {
  const { t } = useTranslation();

  return (
    <$.Root open={p.open} onOpenChange={p.onOpenChange}>
      <$.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          {p.title && <AlertDialogTitle>{p.title}</AlertDialogTitle>}
          <AlertDialogDescription>
            {p.description}
          </AlertDialogDescription>
          <HStack justifyContent="right">
            {p.hasCancel && (
              <$.Cancel asChild>
                <Button flat>
                  {p.cancelText ?? t('cancel')}
                </Button>
              </$.Cancel>
            )}
            <$.Action asChild>
              <Button danger={p.danger} primaryGradient={!p.danger} onClick={p.onOkClick}>
                {p.okText ?? t('ok')}
              </Button>
            </$.Action>
          </HStack>
        </AlertDialogContent>
      </$.Portal>
    </$.Root>
  );
};

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const AlertDialogOverlay = styled($.Overlay, {
  backgroundColor: '$overlayBg',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 0.2s $timingFunction$default`,
});

const AlertDialogContent = styled($.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  backgroundColor: '$card',
  color: '$fg',
  borderRadius: '$2',
  boxShadow: '$l',
  transform: 'translate(-50%, -50%)',
  padding: '$m $l',
  animation: `${contentShow} 0.2s $timingFunction$default`,

  '&:focus': { outline: 'none' },
});

const AlertDialogTitle = styled($.Title, {
  margin: 0,
  color: '$fg',
  fontSize: '$xl',
  fontWeight: 'bold',
  paddingBottom: '$xs',
});

const AlertDialogDescription = styled($.Description, {
  color: '$muted',
  fontSize: '$m',
});
