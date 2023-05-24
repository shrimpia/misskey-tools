import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';


import { HStack } from '@/components/layouts/HStack';
import { VStack } from '@/components/layouts/VStack';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/primitives/Card';
import { Input } from '@/components/primitives/Input';
import { InputLabel } from '@/components/primitives/InputLabel';
import { Radio } from '@/components/primitives/Radio';
import { RadioGroup } from '@/components/primitives/RadioGroup';
import { Select } from '@/components/primitives/Select';
import { Switch } from '@/components/primitives/Switch';
import { Text } from '@/components/primitives/Text';
import { Textarea } from '@/components/primitives/Textarea';
import { trpc } from '@/libs/trpc';

export type NoteSchedulerFormProp = {
	id?: string;
	disabled?: boolean;
	onSubmit?: (draft: Draft) => void;
};

export type Draft = {
	text: string;
	cw: string;
	visibility: string;
	isCwEnabled: boolean;
	localOnly: boolean;
	sessionId: string;
	dateString: string;
}

export const NoteSchedulerForm: React.FC<NoteSchedulerFormProp> = (p) => {
  const [sessions] = trpc.account.getMisskeySessions.useSuspenseQuery();
  const [notes] = trpc.scheduleNote.list.useSuspenseQuery();
  const { t } = useTranslation();

  const draftDefault = useMemo<Draft>(() => ({
    text: '',
    cw: '',
    visibility: 'public',
    isCwEnabled: false,
    localOnly: false,
    sessionId: sessions[0].id,
    dateString: dayjs().tz().add(1, 'h').format('YYYY-MM-DDTHH:mm'),
  }), [sessions]);

  const [draft, setDraft] = useState<Draft>(draftDefault);

  useEffect(() => {
    if (!p.id) {
      setDraft(draftDefault);
      return;
    }
    const note = notes.find(n => n.id === p.id);
    if (!note) throw new Error(`No such scheduled note ID ${p.id}`);
    setDraft({
      text: note.text,
      cw: note.cw ?? '',
      visibility: note.visibility,
      isCwEnabled: note.cw === null,
      localOnly: note.localOnly,
      sessionId: note.misskeySessionId,
      dateString: dayjs(note.date).tz().format('YYYY-MM-DDTHH:mm'),
    });
  }, [draftDefault, notes, p.id]);

  const updateDraft = useCallback(<T extends keyof Draft>(key: T, value: Draft[T]) => {
    setDraft({
      ...draft,
      [key]: value,
    });
  }, [draft]);

  return (

    <VStack>
      <Card pale>
        <VStack>
          <Switch checked={draft.isCwEnabled} disabled={p.disabled} onChange={v => updateDraft('isCwEnabled', v)}>
						内容を隠す
          </Switch>
          {draft.isCwEnabled && (
            <InputLabel>
							内容に対する注釈（オプション）
              <Input value={draft.cw} onChange={e => updateDraft('cw', e.target.value)} />
            </InputLabel>
          )}
        </VStack>
      </Card>
      <Card pale>
        <InputLabel>
          {t('noteBody')}
          <Textarea value={draft.text} disabled={p.disabled} maxLength={3000} onChange={e => updateDraft('text', e.target.value)} />
          {draft.text.length >= 2900 && (
            <Text as="aside" color="danger">
              <i className="ti ti-exclamation-circle"></i>
              {draft.text.length >= 3000 ? (
                t('noMoreInput')
              ) : (
                t('remainedLength', { len: 3000 - draft.text.length })
              )}
            </Text>
          )}
        </InputLabel>
      </Card>

      <Card pale>
        <VStack>
          <InputLabel>
            {t('visibility')}
            <Select value={draft.visibility} disabled={p.disabled} onChange={e => updateDraft('visibility', e.target.value)}>
              <option value="public">{t('_visibility.public')}</option>
              <option value="home">{t('_visibility.home')}</option>
              <option value="followers">{t('_visibility.followers')}</option>
              <option value="specified">{t('_visibility.specified')}</option>
            </Select>
          </InputLabel>

          <Switch checked={draft.localOnly} disabled={p.disabled} onChange={v => updateDraft('localOnly', v)}>
            {t('noFederation')}
          </Switch>
        </VStack>
      </Card>

      <InputLabel as="div">
        {t('_noteScheduler.accountToNote')}
        <RadioGroup value={draft.sessionId} disabled={p.disabled} onValueChange={v => updateDraft('sessionId', v)}>
          {sessions.map(s => (
            <Radio key={s.id} value={s.id}>@{s.username}@{s.host}</Radio>
          ))}
        </RadioGroup>
      </InputLabel>

      <InputLabel>
        {t('datetime')}
        <Input type="datetime-local" value={draft.dateString} disabled={p.disabled} onChange={e => updateDraft('dateString', e.target.value)}></Input>
      </InputLabel>

      <HStack gap="s" justifyContent="right" alignItems="center">
        <Button primaryGradient disabled={p.disabled} onClick={() => p.onSubmit?.(draft)}>
          {t('_noteScheduler.schedule')}
        </Button>
      </HStack>
    </VStack>
  );
};
