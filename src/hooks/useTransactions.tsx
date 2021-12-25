import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transactions {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

// interface TranscationInput{
//   title: string;
//   amount: number;
//   category: string;
//   type: string;
// }

type TranscationInput = Omit<Transactions, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transactions[];
  createTransactions: (Transactions: TranscationInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]); 
  
  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransactions(transactionsInput: TranscationInput){
	  const response = await api.post('/transactions',{
      ...transactionsInput,
      createdAt: new Date(),
    })
    
    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionsContext);

  return context
}