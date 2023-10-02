import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AuthProcess from 'processes/auth';
import { store } from 'shared/lib/store';
import './global.scss';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Suspense fallback="Loading...">
            <AuthProcess />
        </Suspense>
      </HashRouter>
    </Provider>
  );
}

export default App;
