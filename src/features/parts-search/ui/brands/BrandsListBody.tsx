import { memo, useCallback, useMemo } from 'react';
import { AlertBanner, Loader } from '$shared';
import {
  searchOffers,
  selectArticle,
  selectBrands,
  selectBrandsError,
  selectBrandsStatus,
  selectOffersStatus,
  selectSelectedBrand,
  useAppDispatch,
  useAppSelector,
} from '../../model';
import { BrandButton } from './BrandButton';

export const BrandsListBody = memo(() => {
  const dispatch = useAppDispatch();
  const article = useAppSelector(selectArticle);
  const brands = useAppSelector(selectBrands);
  const brandsStatus = useAppSelector(selectBrandsStatus);
  const brandsError = useAppSelector(selectBrandsError);
  const selectedBrand = useAppSelector(selectSelectedBrand);
  const offersStatus = useAppSelector(selectOffersStatus);

  const isOffersLoading = offersStatus === 'loading';

  const emptyMessage = useMemo(() => {
    return `По артикулу «${article}» ничего не найдено.`;
  }, [article]);

  const handleSelect = useCallback(
    (brand: string) => {
      if (isOffersLoading) {
        return;
      }

      void dispatch(
        searchOffers({
          number: article.trim(),
          brand,
        }),
      );
    },
    [article, dispatch, isOffersLoading],
  );

  if (brandsStatus === 'loading') {
    return <Loader label="Ищем производителей по артикулу…" />;
  }

  if (brandsStatus === 'failed') {
    return <AlertBanner variant="danger" message={brandsError} />;
  }

  if (brands.length === 0) {
    return <AlertBanner variant="warning" message={emptyMessage} />;
  }

  return (
    <>
      <p className="text-secondary small mb-3">
        Найдено брендов:
        <span className="badge rounded-pill text-bg-secondary ms-2">{brands.length}</span>
      </p>
      <div className="d-flex flex-wrap gap-2">
        {brands.map((item) => (
          <BrandButton
            key={item.brand}
            brand={item.brand}
            isActive={item.brand === selectedBrand}
            disabled={isOffersLoading}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </>
  );
});

BrandsListBody.displayName = 'BrandsListBody';
