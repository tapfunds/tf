import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { integrationsReducer }  from "./integrations/reducer/integrationReducer";
import { accountReducer }  from "./accounts/reducer/accountReducer";

const reducer = combineReducers({
  Auth: authReducer,
  IntegrationsState: integrationsReducer,
  Account: accountReducer,
})

export default reducer