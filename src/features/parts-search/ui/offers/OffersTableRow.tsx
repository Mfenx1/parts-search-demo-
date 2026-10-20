import { memo, useMemo } from 'react';
import { formatPrice } from '$shared';
import type { OfferRow } from '../../api';
import { OfferKindBadge } from './OfferKindBadge';

type OffersTableRowProps = {
  row: OfferRow;
};

export const OffersTableRow = memo(({ row }: OffersTableRowProps) => {
  const stockClassName = useMemo(() => {
    if (row.stock > 0) {
      return 'badge rounded-pill text-bg-success';
    }

    return 'badge rounded-pill text-bg-secondary';
  }, [row.stock]);

  return (
    <tr>
      <td className="ps-4">
        <div className="fw-semibold">{row.name}</div>
        <div className="text-secondary small">{row.brand}</div>
      </td>
      <td className="font-monospace small">{row.number}</td>
      <td className="text-end text-nowrap fw-semibold">{formatPrice(row.price)}</td>
      <td className="text-end">
        <span className={stockClassName}>{row.stock}</span>
      </td>
      <td className="pe-4">
        <OfferKindBadge isAnalog={row.isAnalog} />
      </td>
    </tr>
  );
});

OffersTableRow.displayName = 'OffersTableRow';
