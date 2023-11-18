import React from 'react';
import { Route, BrowserRouter, Switch, useLocation } from 'react-router-dom';
import Home from './Views/Home/Home';
import Detail from './Views/Details/Detail';
import Form from './Views/Form/Form';
import Landing from './Views/Landing/Landing';
import NavBar from './Components/NavBar/NavBar';

function App() {
  const location = useLocation();

  // Mostrar NavBar en todas las rutas excepto en "/landing"
  const isNavBarVisible = location.pathname !== '/';

  return (
    <div className="App">
      {isNavBarVisible && <NavBar />}
     
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/form" component={Form} />
        </Switch>
     
    </div>
  );
}

export default App;
