import { memo, useMemo } from 'react';
import { AlertBanner, Loader } from '$shared';
import {
  selectOffers,
  selectOffersError,
  selectOffersStatus,
  selectSelectedBrand,
  useAppSelector,
} from '../../model';
import { OffersTableRow } from './OffersTableRow';

export const OffersTableBody = memo(() => {
  const selectedBrand = useAppSelector(selectSelectedBrand);
  const offers = useAppSelector(selectOffers);
  const offersStatus = useAppSelector(selectOffersStatus);
  const offersError = useAppSelector(selectOffersError);

  const loadingLabel = useMemo(() => {
    return `Загружаем аналоги и предложения для ${selectedBrand}…`;
  }, [selectedBrand]);

  const emptyMessage = useMemo(() => {
    return `Для производителя «${selectedBrand}» предложения не найдены.`;
  }, [selectedBrand]);

  if (offersStatus === 'loading') {
    return (
      <div className="card-body p-4 pt-3">
        <Loader label={loadingLabel} />
      </div>
    );
  }

  if (offersStatus === 'failed') {
    return (
      <div className="card-body p-4 pt-3">
        <AlertBanner variant="danger" message={offersError} />
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="card-body p-4 pt-3">
        <AlertBanner variant="warning" message={emptyMessage} />
      </div>
    );
  }

  return (
    <>
      <div className="px-4 pt-3 pb-3">
        <p className="text-secondary small mb-0">
          Производитель
          <span className="badge rounded-pill text-bg-primary ms-2">{selectedBrand}</span>
          <span className="ms-2">Цена — минимальная среди складов.</span>
        </p>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="text-secondary text-uppercase small">
              <th className="ps-4 fw-semibold">Название / Производитель</th>
              <th className="fw-semibold">Артикул</th>
              <th className="fw-semibold text-end">Стоимость</th>
              <th className="fw-semibold text-end">Остаток</th>
              <th className="pe-4 fw-semibold">Тип</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((row) => (
              <OffersTableRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});

OffersTableBody.displayName = 'OffersTableBody';
