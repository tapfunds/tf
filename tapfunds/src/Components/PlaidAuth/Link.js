import React, { useState, useCallback, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createIntegration
} from "../../store/modules/integrations/actions/IntegrationAction"
import {createAccountObject} from "../../store/modules/accounts/actions/accountActions"
import {PLAID_URL} from "../../constants/routes";

const tokenURL = `${PLAID_URL}/create_link_token`;
const sendTokenURL = `${PLAID_URL}/set_access_token`;

function Link() {
  const [data, setData] = useState("");
  const currentUserState = useSelector((state) => state.Auth);
  const AuthID = currentUserState.currentUser
    ? currentUserState.currentUser.id
    : "";

  const user = currentUserState.currentUser
  ? currentUserState.currentUser
  : "";
  const dispatch = useDispatch();

  const fetchToken = useCallback(async () => {
    const config = {
      method: "post",
      url: tokenURL,
    };
    const res = await axios(config);
    setData(res.data.link_token);
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  const history = useHistory();

  const routeChange = useCallback( () => { 
    let path = `/home`; 
    history.push(path);
  }, [history]);

  const onSuccess = useCallback(async (token, metadata) => {
    const sendToken = (integrationDetails) => dispatch(createIntegration(integrationDetails));
    const sendObject = (accountDetails) => dispatch(createAccountObject(accountDetails));

    // send token to server
    const config = {
      method: "post",
      url: sendTokenURL,
      data: qs.stringify({ public_token: token }),
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    try {
      const response = await axios(config);
      let details = { 
        UserID: AuthID,
        User: user,
        ItemID: response.data.item_id,
        AccessToken: response.data.access_token,
        access_token_institution: response.data.access_token_institution
        
      }
      sendToken(details)
      details = {user_ID: AuthID, access_token: response.data.access_token }
      sendObject(details)
  
    } catch (error) {
      console.error(error);
    }
    routeChange()
  }, [AuthID, user, dispatch, routeChange]);

  const config = {
    token: data,
    onSuccess,
  };

  const { open, ready, err } = usePlaidLink(config);
  // make an
  if (err) return <p>Error!</p>;
  
  return (
    <div>
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>
    </div>
  );
}

export default Link;