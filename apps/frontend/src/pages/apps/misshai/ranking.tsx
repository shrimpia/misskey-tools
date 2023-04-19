import React  from 'react';
import { useTranslation } from 'react-i18next';
import { Ranking } from '../../../components/Ranking';
import { useTitle } from '../../../hooks/useTitle';


export const RankingPage: React.FC = () => {
  const {t} = useTranslation();
  useTitle('_missHai.ranking');

  return (
    <article>
      <h2>{t('_missHai.ranking')}</h2>
      <section>
        <p>{t('_missHai.rankingDescription')}</p>
      </section>
      <section className="pt-2">
        <Ranking />
      </section>
    </article>
  );
};
