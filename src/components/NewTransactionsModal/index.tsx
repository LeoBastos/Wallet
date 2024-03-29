import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionsTypeContainer } from '../NewTransactionsModal/styles';

interface NewTransactionsModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function NewTransactionsModal({ isOpen, onRequestClose }: NewTransactionsModalProps) {
	const {createTransactions} = useTransactions()
	
  const [title, setTitle] = useState('');
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransactions(event: FormEvent){
	event.preventDefault();
	
	await createTransactions({
      title,
      amount,
      category,
      type
    })
  setTitle('');
  setAmount(0);
  setCategory('');
  setType('deposit');
	onRequestClose();
  }

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<button 
				type="button" 
				onClick={onRequestClose} 
				className='react-modal-close'
				>
				<img src={closeImg} alt="Fechar Modal" />
			</button>

			<Container onSubmit={handleCreateNewTransactions}>
				<h2>Cadastrar transação</h2>
				<input 
					placeholder='Titulo'
					value={title}
					onChange={event => setTitle(event.target.value)}
				/>

				<input
					type="number"
					placeholder='Valor'
					value={amount}
					onChange={event => setAmount(+event.target.value)}
					// onChange={event => setValue(Number(event.target.value))}
				/>

				<TransactionsTypeContainer>
          <RadioBox
            type="button"          
            onClick={() => {setType('deposit'); }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>           
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => {setType('withdraw');}}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saida" />
              <span>Saida</span>            
          </RadioBox>
				</TransactionsTypeContainer>

				<input
					placeholder='Categoria'
					value={category}
					onChange={event => setCategory(event.target.value)}
				/>
				<button type='submit'>Cadastrar</button>
			</Container>
		</Modal>
	)
}