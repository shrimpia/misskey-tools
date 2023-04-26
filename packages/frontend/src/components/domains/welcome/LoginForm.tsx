import React, { FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HStack } from '@/components/layouts/HStack.js';
import { VStack } from '@/components/layouts/VStack.js';
import { Button } from '@/components/primitives/Button.js';
import { Input } from '@/components/primitives/Input.js';
import { InputLabel } from '@/components/primitives/InputLabel.js';
import { Text } from '@/components/primitives/Text.js';
import { styled } from '@/libs/stitches.js';
import { sanitizeHost } from '@/misc/sanitize-host.js';

const Container = styled('div', {
  height: 100,
});

export type LoginFormProp = {
	onLogin?: (host: string) => void;
};

/**
 * Misskey サーバーURLを入力するフォームです。
 */
export const LoginForm: React.FC<LoginFormProp> = (p) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  const validate = () => {
    setError(null);
    try {
      sanitizeHost(value);
    } catch (e) {
      setError(t('instanceUrlValidationError') ?? '');
    }
  };

  // 入力値バリデーション & イベント発行
  const onClickLoginButton: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const host = sanitizeHost(value);
    p.onLogin?.(host);
  };

  const hasError = error != null;

  return (
    <Container>
      <VStack as="form" onSubmit={onClickLoginButton}>
        <HStack gap="s" alignItems="right">
          <InputLabel>
            {t('instanceUrl')}
            <Input
              placeholder={t('instanceUrlPlaceholder') ?? ''}
              error={hasError}
              value={value}
              onBlur={validate}
              onChange={e => setValue(e.target.value)}
            />
          </InputLabel>
          <Button type="submit" primaryGradient disabled={hasError || !value}>
            {t('login')}
          </Button>
        </HStack>
        {hasError && <Text color="danger" fontSize="xs"><i className="ti ti-alert-circle-filled"/> {error}</Text>}
      </VStack>
    </Container>
  );
};
