import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { integrationsReducer }  from "./integrations/reducer/integrationReducer";
import { accountReducer }  from "./bank/reducer/bankReducer";

const reducer = combineReducers({
  Auth: authReducer,
  IntegrationsState: integrationsReducer,
  Account: accountReducer,
})

export default reducer