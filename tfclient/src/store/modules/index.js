import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { integrationsState }  from "./integrations/reducer/integrationReducer";

const reducer = combineReducers({
  Auth: authReducer,
  IntegrationsState: integrationsState
})

export default reducer