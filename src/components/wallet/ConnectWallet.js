import React from 'react';
import {useState} from 'react';
import Web3 from 'web3';

function ConnectWallet() {
  
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };


    // to connect metamask

    const onConnect = async() => {
        try {
          const currentProvider = detectCurrentProvider();
          if(currentProvider) {
            await currentProvider.request({method: 'eth_requestAccounts'});
            const web3 = new Web3(currentProvider);
            const userAccount  =await web3.eth.getAccounts();
            const account = userAccount[0];
            let ethBalance = await web3.eth.getBalance(account);
            setEthBalance(ethBalance);
            setIsConnected(true);
          }
        } catch(err) {
          console.log(err);
        }
      }
     //to disconnect metamask 
      const onDisconnect = () => {
        setIsConnected(false);
      }

    // FrontEND part

    return (
        <div className="dapp">
          <div className="dapp-header">
            <h1>React dApp with React, We3.js and Metamask</h1>
          </div>
          <div className="dapp-wrapper">
            {!isConnected && (
              <div>
                <button type="button" className="dapp-button_login" onClick={onConnect}>
                Login
                </button>
              </div>
            )}
          </div>
          {isConnected && (
            <div className="dapp-wrapper">
              <div className="dapp-details">
                <h2> You are connected to metamask.</h2>
                <div className="dapp-balance">
                  <span>Balance:{ethBalance} </span>
                </div>
              </div>
              <div>
                <button type="button" className="dapp-buttons_logout" onClick={onDisconnect}>
                Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

export default ConnectWallet;