import React from 'react';
import { Link } from 'react-router-dom';

import { widget } from '@/components/domains/dashboard/def';
import { styled } from '@/libs/stitches';

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

const AppIcon = styled(Link, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',
  textDecoration: 'none',
  alignItems: 'center',
  color: '$muted',
  fontWeight: 'bold',
  fontSize: '$s',
  marginBottom: '$m',

  '&:hover > i': {
    transform: 'scale(1.3)',
  },

  '> i': {
    display: 'flex',
    width: 64,
    height: 64,
    borderRadius: '$3',
    alignItems: 'center',
    justifyContent: 'center',
    background: '$primaryA',
    color: '$primary',
    fontSize: '$3xl',
    transformOrigin: 'center',
    transition: 'transform 0.5s $timingFunction$default',
  },

  '> span': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 85,
    textAlign: 'center',
  },
});

export default widget('apps', 'ti ti-grid-dots', true, () => {
  return (
    <Container>
      <AppIcon to="/apps/misskeholic">
        <i className="ti ti-antenna"/>
        <span>ミス廃</span>
      </AppIcon>
      <AppIcon to="/apps/misskeholic/following-manager">
        <i className="ti ti-arrows-left-right"/>
        <span>フォロー管理</span>
      </AppIcon>
      <AppIcon to="/apps/avatar-cropper">
        <i className="ti ti-scissors"/>
        <span>クロッパー</span>
      </AppIcon>
      <AppIcon to="/apps/question-box">
        <i className="ti ti-mailbox"/>
        <span>質問ボックス</span>
      </AppIcon>
      <AppIcon to="/apps/my-page">
        <i className="ti ti-article"/>
        <span>マイページ</span>
      </AppIcon>
      {/* <AppIcon to="/apps/server-search">
        <i className="ti ti-search"/>
        <span>サーバー検索</span>
      </AppIcon>
      <AppIcon to="/apps/note-cleaner">
        <i className="ti ti-eraser"/>
        <span>ノート削除</span>
      </AppIcon> */}
      <AppIcon to="/apps/note-scheduler">
        <i className="ti ti-alarm"/>
        <span>予約投稿</span>
      </AppIcon>
    </Container>
  );
});
