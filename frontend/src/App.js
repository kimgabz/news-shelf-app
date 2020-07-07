import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Home }/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;