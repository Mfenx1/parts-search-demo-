import { memo } from 'react';
import { PartsSearchScreen } from '$features/parts-search';

export const App = memo(() => {
  return <PartsSearchScreen />;
});

App.displayName = 'App';
