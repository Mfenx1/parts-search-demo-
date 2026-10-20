import { memo } from 'react';
import { selectOffersStatus, useAppSelector } from '../../model';
import { OffersTableBody } from './OffersTableBody';

export const OffersTable = memo(() => {
  const offersStatus = useAppSelector(selectOffersStatus);

  if (offersStatus === 'idle') {
    return null;
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
        <span className="badge text-bg-primary-subtle text-primary-emphasis mb-2">Этап 2</span>
        <h2 className="h5 mb-0">Аналоги и предложения</h2>
      </div>
      <OffersTableBody />
    </div>
  );
});

OffersTable.displayName = 'OffersTable';
