import { memo } from 'react';
import { selectBrandsStatus, useAppSelector } from '../../model';
import { BrandsListBody } from './BrandsListBody';

export const BrandsList = memo(() => {
  const brandsStatus = useAppSelector(selectBrandsStatus);

  if (brandsStatus === 'idle') {
    return null;
  }

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
        <span className="badge text-bg-primary-subtle text-primary-emphasis mb-2">Этап 1</span>
        <h2 className="h5 mb-0">Выберите производителя</h2>
      </div>
      <div className="card-body p-4 pt-3">
        <BrandsListBody />
      </div>
    </div>
  );
});

BrandsList.displayName = 'BrandsList';
