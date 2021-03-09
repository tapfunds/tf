import React from "react";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import ForgotPassword from "../../Pages/ForgotPassword";
import ResetPassword from "../../Pages/ResetPassword";
import Landing from "../../Pages/Landing";
import Settings from "../../Pages/Settings";
import PlaidAuth from "../../Pages/PlaidAuth";
import Stats from "../../Pages/Stats";
import FoF from "../../Pages/FourOhFour"
import { Route, Switch } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const App = () => {
  return (
       <div>
        <Switch>
            <Route exact path={ROUTES.LANDING} component={Landing}/>
            <Route path={ROUTES.HOME} component={Home}/>
            <Route path={ROUTES.AUTH} component={PlaidAuth}/>
            <Route path={ROUTES.SETTING} component={Settings}/>
            <Route path={ROUTES.STATS} component={Stats}/>
            <Route path={ROUTES.SIGN_IN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={Register} />
            <Route path={ROUTES.RESET} component={ForgotPassword} />
            <Route path='/reset/:token' component={ResetPassword} />
            <Route component={FoF}/>
        </Switch>
      </div>
  );
}

export default App;
