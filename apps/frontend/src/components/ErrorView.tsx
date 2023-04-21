import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

export type ErrorViewProp = PropsWithChildren<{
	additionalInfo: string;
}>;

export const ErrorView: React.FC<ErrorViewProp> = ({additionalInfo, children}) => {
  const {t} = useTranslation();

  return (
    <div className="card fade">
      <div className="body">
        <h1 className="text-danger">{t('error')}</h1>
        <p>{t('_error.sorry')}</p>
        <p className="text-dimmed">
          {t('_error.additionalInfo')}{additionalInfo}
        </p>
        {children}
      </div>
    </div>
  );
};
