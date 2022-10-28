import React,{useState} from 'react';
import { Button } from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
const ethers = require('ethers');
const Web3 = require("web3");

const WalletCard = () =>{
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ defaultAccount, setDefaultAccount]= useState(null);
    const [ balance, setUserBalance ] = useState(null);
    const [ connButtonText,setConnButtonText] = useState('connect wallet');
    const web3 = new Web3(process.env.RPC_URL);

    //provider
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
      //provider


    // set a provider such as using infura
    // const web3 = new Web3("https://mainnet.infura.io/v3/endpoint");
    // Get the balance of an Ethereum address
    //web3.eth.getBalance("0x6c3fac18cef47aaa635a84a1599a3c4dce9336ab").then(console.log);
    //web3.fromWei(web3.eth.getBalance(web3.eth.account[0]));
    //web3.fromWei(web3.eth.getBalance('0x6c3fac18cef47aaa635a84a1599a3c4dce9336ab'));



    const connectWalletHandler = () => {
        if(window.ethereum){
            //metamask is here
            window.ethereum.request({method:'eth_requestAccounts'}).then(result =>{
                accountChangeHandler(result[0]);
            })
        } else{
            setErrorMessage('install metamask')
        }
    }


    const accountChangeHandler =(newAccount)=>{
        setDefaultAccount(newAccount);
        getUserBalance(newAccount);
        console.log(newAccount);
    }

    const getUserBalance = (account) => {
        window.ethereum.request({method:'eth_getBalance',params:[account, 'latest']})
        .then(balance => {
            //web3.eth.getBalance("0x6c3fac18cef47aaa635a84a1599a3c4dce9336ab").then(console.log);
            setUserBalance(ethers.utils.formatEther(balance));


            console.log(balance);
        })
        .catch(error => {
            setErrorMessage(error.message);
        })
    }


    const getUserAccount =(account)=>{
        window.ethereum.request({method:'eth_getBalance'}).then(balance => {
            setUserBalance(balance);
        })
    }
    
    
    return (
        <div className='walletcard'>
            <br />
            <h3>Connect to MetaMask Wallet</h3><br />
            <button className="btn btn-primary" type="button" onClick={accountChangeHandler}> {connButtonText} </button> <br></br>
            <div className='accountDisplay'>
                <h4>MetaMask Address: {defaultAccount}</h4>
            </div>
            <div className='balanceDisplay'>
                <h4>MetaMask Balance:{balance}</h4>
            </div>

            {errorMessage}
        </div>
    )
}

export default WalletCard;










