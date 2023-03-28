import * as React from 'react';

import { Button } from './Button';

export function App() {
  return (
    <div>
      <Button>МойСклад</Button>
      <br />
      <br />
      <Button disabled>Disabled</Button>
    </div>
  );
}
