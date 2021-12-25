import { Dashboard } from './components/Dashboard';
import Modal from 'react-modal';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import { useState } from 'react';
import { NewTransactionsModal } from './components/NewTransactionsModal';
import { TransactionsProvider } from './hooks/useTransactions';



Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionsModalOpen, setIsNewTransactionsOpen] = useState(false);
    
  function handleOpenNewTransactionsModal(){
    setIsNewTransactionsOpen(true);
  }

  function handleCloseNewTransactionsModal(){
    setIsNewTransactionsOpen(false);
  }
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionsModal={handleOpenNewTransactionsModal} />
      <Dashboard />  
      <NewTransactionsModal 
        isOpen={isNewTransactionsModalOpen}
        onRequestClose={handleCloseNewTransactionsModal}
      />    
      <GlobalStyle />
    </TransactionsProvider>
  );
}
