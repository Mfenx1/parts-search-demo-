import { memo } from 'react';

type LoaderProps = {
  label: string;
};

export const Loader = memo(({ label }: LoaderProps) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center gap-3 py-5"
      role="status"
    >
      <div className="spinner-border text-primary" aria-hidden="true" />
      <span className="text-secondary">{label}</span>
    </div>
  );
});

Loader.displayName = 'Loader';
