import React from 'react';

import type { StoryObj, Meta } from '@storybook/react';

import { Button } from '@/components/primitives/Button.js';
import { PopupMenu } from '@/components/primitives/PopupMenu';

const meta = {
  component: PopupMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PopupMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{
      type: 'heading',
      label: '有効',
    }, {
      iconClassName: 'ti ti-users',
      type: 'button',
      label: 'ボタン',
      onClick() {
        alert('よん！');
      },
    }, {
      type: 'sub',
      label: 'サブメニュー',
      items: [{
        type: 'heading',
        label: 'サブメニュー',
      }, {
        type: 'button',
        label: 'ボタン',
        onClick() {
          alert('よん！');
        },
      }],
    }, {
      type: 'separator',
    }, {
      type: 'heading',
      label: '無効',
    }, {
      type: 'button',
      label: 'ボタン',
      disabled: true,
      onClick() {
        alert('よん！');
      },
    }, {
      type: 'sub',
      label: 'サブメニュー',
      disabled: true,
      items: [{
        type: 'heading',
        label: 'ヘッダー1',
      }, {
        type: 'button',
        label: 'ボタン',
        onClick() {
          alert('よん！');
        },
      }],
    }],
    children: <Button>Open</Button>,
  },
};
