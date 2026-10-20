import { memo, useCallback, useMemo } from 'react';

type BrandButtonProps = {
  brand: string;
  disabled: boolean;
  isActive: boolean;
  onSelect: (brand: string) => void;
};

export const BrandButton = memo(({ brand, disabled, isActive, onSelect }: BrandButtonProps) => {
  const className = useMemo(() => {
    if (isActive) {
      return 'btn btn-sm rounded-pill btn-primary';
    }

    return 'btn btn-sm rounded-pill btn-outline-secondary';
  }, [isActive]);

  const handleClick = useCallback(() => {
    onSelect(brand);
  }, [brand, onSelect]);

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={isActive}
    >
      {brand}
    </button>
  );
});

BrandButton.displayName = 'BrandButton';
