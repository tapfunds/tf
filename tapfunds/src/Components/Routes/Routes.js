import React from "react";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Register from "../../Pages/Register";
import ForgotPassword from "../../Pages/ForgotPassword";
import ResetPassword from "../../Pages/ResetPassword";
import Landing from "../../Pages/Landing";
import Settings from "../../Pages/Settings";
import PlaidAuth from "../../Pages/PlaidAuth.tsx";
import FoF from "../../Pages/FourOhFour";
import PlaceHolder from "../../Pages/Placeholder.tsx";
import { Route, Switch } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const App = () => {
  return (
       <div>
        <Switch>
            <Route exact path={ROUTES.LANDING} component={Landing}/>
            <Route exact path={ROUTES.HOME} component={Home}/>
            <Route exact path={ROUTES.AUTH} component={PlaidAuth}/>
            <Route exact path={ROUTES.SETTING} component={Settings}/>
            <Route exact path={ROUTES.STATS} component={PlaceHolder}/>
            <Route exact path={ROUTES.SIGN_IN} component={Login} />
            <Route exact path={ROUTES.SIGN_UP} component={Register} />
            <Route exact path={ROUTES.ACCOUNTS} component={PlaceHolder}/>
            <Route exact path={ROUTES.WALLETS} component={PlaceHolder} />
            <Route exact path={ROUTES.TRANSFERS} component={PlaceHolder} />
            <Route exact path={ROUTES.ABOUT} component={PlaceHolder} />
            <Route exact path={ROUTES.RESET} component={ForgotPassword} />
            <Route exact path='/reset/:token' component={ResetPassword} />
            <Route component={FoF}/>
        </Switch>
      </div>
  );
}

export default App;
