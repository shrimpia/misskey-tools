import React from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorCode } from 'tools-shared/dist/types/error-code.js';

import { Centered } from '@/components/layouts/Centered.js';
import { VStack } from '@/components/layouts/VStack.js';
import { useToolsGlobalEffects } from '@/global-effects.js';

export type BackendErrorProp = {
	error: ErrorCode,
};

/**
 * バックエンドからのエラーをレンダリングするためのコンポーネント。
 */
export const BackendError: React.FC<BackendErrorProp> = (p) => {
  useToolsGlobalEffects();
  const { t } = useTranslation();

  return (
    <Centered fullscreen>
      <VStack>
        <h1>{t('error')}</h1>
        <p>{t('_error.sorry')}</p>
        <p>
          {t('_error.additionalInfo')}
          {t(`_error.${p.error}`)}
        </p>
        <a href="/">{t('retry')}</a>
      </VStack>
    </Centered>
  );
};
