import logo from './logo.svg';
import './App.css';
import WalletCard from './components/WalletCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnectWallet from './components/wallet/ConnectWallet';
import WalletTask from '../src/components/wallet/WalletTask';



function App() {
  return (
    <div className="App">

      <WalletTask />
      
     {/* <WalletCard />   

         <ConnectWallet />     
      */} 
       
    </div>
  );
}

export default App;
