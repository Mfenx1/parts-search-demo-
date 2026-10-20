import { memo } from 'react';

type OfferKindBadgeProps = {
  isAnalog: boolean;
};

export const OfferKindBadge = memo(({ isAnalog }: OfferKindBadgeProps) => {
  if (isAnalog) {
    return <span className="badge rounded-pill text-bg-info-subtle text-info-emphasis">Аналог</span>;
  }

  return (
    <span className="badge rounded-pill text-bg-primary-subtle text-primary-emphasis">Исходная</span>
  );
});

OfferKindBadge.displayName = 'OfferKindBadge';
