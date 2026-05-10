import { useLanguage } from '../../lib/i18n';

export default function KingCastlePlan() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen text-white flex justify-center items-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-4xl">{t('king_castle_plan_page')}</h1>
    </div>
  );
}
