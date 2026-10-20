import { memo, useCallback, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { searchBrands, selectBrandsStatus, useAppDispatch, useAppSelector } from '../../model';

export const SearchForm = memo(() => {
  const dispatch = useAppDispatch();
  const brandsStatus = useAppSelector(selectBrandsStatus);
  const [draft, setDraft] = useState('');

  const isLoading = brandsStatus === 'loading';
  const trimmedDraft = draft.trim();

  const isSubmitDisabled = useMemo(() => {
    return isLoading || !trimmedDraft;
  }, [isLoading, trimmedDraft]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!trimmedDraft || isLoading) {
        return;
      }

      void dispatch(searchBrands(trimmedDraft));
    },
    [dispatch, isLoading, trimmedDraft],
  );

  return (
    <form className="card border-0 shadow-sm rounded-4" onSubmit={handleSubmit}>
      <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
        <span className="badge text-bg-primary-subtle text-primary-emphasis mb-2">Этап 1</span>
        <h2 className="h5 mb-0">Поиск производителей</h2>
      </div>
      <div className="card-body p-4 pt-3">
        <p className="text-secondary mb-3">
          Введите артикул детали. Сервис вернёт бренды, которые выпускают этот номер.
        </p>
        <label className="form-label fw-semibold" htmlFor="article">
          Артикул
        </label>
        <div className="input-group input-group-lg">
          <input
            id="article"
            className="form-control"
            value={draft}
            onChange={handleChange}
            placeholder="Например, 01089 или 7160500039S"
            autoComplete="off"
            disabled={isLoading}
          />
          <button className="btn btn-primary text-nowrap" type="submit" disabled={isSubmitDisabled}>
            {isLoading ? (
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
            ) : null}
            Найти
          </button>
        </div>
      </div>
    </form>
  );
});

SearchForm.displayName = 'SearchForm';
