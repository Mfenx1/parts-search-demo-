import { memo, useMemo } from 'react';

type AlertBannerVariant = 'danger' | 'warning';

type AlertBannerProps = {
  message: string;
  variant: AlertBannerVariant;
};

export const AlertBanner = memo(({ message, variant }: AlertBannerProps) => {
  const className = useMemo(() => `alert alert-${variant} rounded-3 mb-0`, [variant]);

  const role = variant === 'danger' ? 'alert' : 'status';

  return (
    <div className={className} role={role}>
      {message}
    </div>
  );
});

AlertBanner.displayName = 'AlertBanner';
