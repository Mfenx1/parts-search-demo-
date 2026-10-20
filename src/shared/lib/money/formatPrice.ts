const RUB_FORMATTER = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 2,
});

export const formatPrice = (price: number | null): string => {
  if (price == null) {
    return '—';
  }

  return RUB_FORMATTER.format(price);
};
