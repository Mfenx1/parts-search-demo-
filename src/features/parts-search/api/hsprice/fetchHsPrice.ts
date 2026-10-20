import { isFilledGood } from './isFilledGood';
import type { FavoritGood, FavoritPriceResponse, FetchHsPriceParams } from './types';

const API_PATH = '/api/hsprice';

const getApiKey = (): string => {
  const key = import.meta.env.VITE_FAVORIT_API_KEY;

  if (!key) {
    throw new Error('Не указан ключ API. Заполните VITE_FAVORIT_API_KEY в файле .env');
  }

  return key;
};

const requestHsPrice = async (url: string): Promise<Response> => {
  try {
    return await fetch(url);
  } catch {
    throw new Error('Сбой сети. Проверьте подключение и повторите запрос.');
  }
};

const readHsPriceJson = async (response: Response): Promise<FavoritPriceResponse> => {
  try {
    return (await response.json()) as FavoritPriceResponse;
  } catch {
    throw new Error('Не удалось разобрать ответ API.');
  }
};

export const fetchHsPrice = async ({
  number,
  brand,
  analogues,
}: FetchHsPriceParams): Promise<FavoritGood[]> => {
  const params = new URLSearchParams();

  params.set('key', getApiKey());
  params.set('number', number);

  if (brand) {
    params.set('brand', brand);
  }

  if (analogues) {
    params.set('analogues', 'on');
  }

  const response = await requestHsPrice(`${API_PATH}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Сервис ответил с ошибкой HTTP ${response.status}`);
  }

  const data = await readHsPriceJson(response);

  if (data.error) {
    throw new Error(String(data.error));
  }

  if (!Array.isArray(data.goods)) {
    return [];
  }

  return data.goods.filter(isFilledGood);
};
