import { memo } from 'react';
import { BrandsList } from '../brands';
import { OffersTable } from '../offers';
import { SearchForm } from '../search';

export const PartsSearchScreen = memo(() => {
  return (
    <>
      <nav className="navbar bg-white border-bottom shadow-sm">
        <div className="container-xl d-flex align-items-center justify-content-between gap-3">
          <span className="navbar-brand mb-0 fw-semibold">Подбор автозапчастей</span>
          <span className="badge rounded-pill text-bg-primary-subtle text-primary-emphasis">
            Favorit Parts · Проценка
          </span>
        </div>
      </nav>

      <main className="container-xl py-4 py-lg-5">
        <p className="lead text-secondary mb-4">
          Двухэтапный подбор: сначала производители по артикулу, затем аналоги и предложения со
          складов.
        </p>

        <div className="d-flex flex-column gap-4">
          <SearchForm />
          <BrandsList />
          <OffersTable />
        </div>
      </main>
    </>
  );
});

PartsSearchScreen.displayName = 'PartsSearchScreen';
