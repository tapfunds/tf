import React from 'react'
import { Button } from 'antd';
// import qs from "qs";
// import axios from "axios";

// const balenceURL = `${process.env.REACT_APP_DEV_PLAID_API_URL}/api/transfer`;

const Transfer = (props) => {

    // useEffect(() => {
    //     const config = {
    //       method: "POST",
    //       body: qs.stringify({ account_id: props.accnt }),
    //       headers: { "content-type": "application/json" },
    //     };
    //     async function initTransfer(){
    //       setIsLoading(true)
    //       const fetcher = await window.fetch(tokenConfigUrl, config)
    //       const response = await fetcher.json()
    //       console.log(response)
    //     }
    //     initTransfer()
    
    //   }, []);

    const handleClick = (e)=> {
        if (props.action === "Send") {
            console.log("Send money to which account", e)
            // send money through api from account
        } else if (props.action === "Recieve") {
            console.log("Receieve money from whenst", e)
            // receive money through api
        }
    }
    return <Button onClick={handleClick}>{props.lable}</Button>
}

export default Transfer