import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AuthProcess from 'processes/auth';
import { store } from 'shared/lib/store';
import './global.scss';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback="Loading...">
            <AuthProcess />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
