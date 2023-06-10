import { useEffect, useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { RouterOutput } from '@/libs/trpc';

import { HStack } from '@/components/layouts/HStack';
import { VStack } from '@/components/layouts/VStack';
import { Alert } from '@/components/primitives/Alert';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/primitives/Card';
import { Radio } from '@/components/primitives/Radio';
import { RadioGroup } from '@/components/primitives/RadioGroup';
import { Switch } from '@/components/primitives/Switch';
import { Text } from '@/components/primitives/Text';
import { Textarea } from '@/components/primitives/Textarea';

type Account = NonNullable<RouterOutput['holic']['getAccount']>;

export type HolicSettingsDraft = Omit<Account, 'misskeySessionId'>;

export type HolicSettingsProp = {
	draft?: HolicSettingsDraft;
	onUpdateDraft?: (newDraft: HolicSettingsDraft) => void;
};

export const DRAFT_DEFAULT: HolicSettingsDraft = {
  alertAsNote: false,
  alertAsNotification: true,
  noteVisibility: 'home',
  noteLocalOnly: false,
  rankingVisible: false,
  template: null,
};


export const HolicSettings: React.FC<HolicSettingsProp> = (p) => {
  const { t } = useTranslation();

  const [draft, setDraft] = useState<HolicSettingsDraft>(DRAFT_DEFAULT);
  const [isHelpDialogOpened, setHelpDialogOpened] = useState(false);

  useEffect(() => {
    if (!p.draft) return;
    setDraft(p.draft);
  }, [p.draft]);

  const updateDraft = <K extends keyof HolicSettingsDraft, V extends HolicSettingsDraft[K]>(key: K, value: V) => {
    const newDraft = { ...draft };
    newDraft[key] = value;
    setDraft(newDraft);
    p.onUpdateDraft?.(newDraft);
  };

  return (
    <>
      <Card pale>
        <h1>{t('alertMode')}</h1>
        <VStack>
          <Switch checked={draft.alertAsNote} onChange={v => updateDraft('alertAsNote', v)}>
            {t('_misshaiAlert.note')}
          </Switch>
          <Switch checked={draft.alertAsNotification} onChange={v => updateDraft('alertAsNotification', v)}>
            {t('_misshaiAlert.notification')}
          </Switch>
        </VStack>
      </Card>
      <Card pale>
        <h1>{t('visibility')}</h1>
        <VStack>
          <RadioGroup value={draft.noteVisibility} onValueChange={v => updateDraft('noteVisibility', v)}>
            <Radio value="home">{t('_visibility.home')}</Radio>
            <Radio value="followers">{t('_visibility.followers')}</Radio>
          </RadioGroup>
          <Switch checked={draft.noteLocalOnly} onChange={v => updateDraft('noteLocalOnly', v)}>
            {t('noFederation')}
          </Switch>
        </VStack>
      </Card>
      <Card pale>
        <h1>{t('_misshaiAlert.holicRanking')}</h1>
        <VStack>
          <Switch checked={draft.rankingVisible} onChange={v => updateDraft('rankingVisible', v)}>
            {t('_misshaiAlert.useRanking')}
          </Switch>
        </VStack>
      </Card>
      <Card pale>
        <h1>{t('template')}</h1>
        <p>
          {t('_template.description')}<br/>
          <Text as="span" fontSize="s" color="muted">{t('_template.hashtagAutomaticInsertion')}</Text>
        </p>
        <VStack alignItems="left">
          <HStack>
            <Button size="small" primary>{t('_template.insertVariables')}</Button>
            <Button size="small" flat primary css={{ fontSize: 20, padding: 0 }} onClick={() => setHelpDialogOpened(true)}>
              <i className="ti ti-help-circle"/>
            </Button>
          </HStack>
          <Textarea rows={8} placeholder={t('_template.default')} value={draft.template ?? ''} onChange={e => updateDraft('template', e.target.value)} />
        </VStack>
      </Card>

      <Alert
        description={t('_template.insertVariablesHelp')}
        open={isHelpDialogOpened}
        onOpenChange={setHelpDialogOpened}
      />
    </>
  );
};
