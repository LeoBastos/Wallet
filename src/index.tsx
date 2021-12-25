import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';


createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Salário Mensal',
          type: 'deposit',
          category: 'Dev',
          amount: 2400.00,
          createdAt: new Date('2021-12-07 08:33:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Despesas Mensais',
          amount: 500.00,
          createdAt: new Date('2021-12-07 08:33:00')
        },
        {
          id: 3,
          title: 'Emprestimo Moto',
          type: 'withdraw',
          category: 'Despesas Fixas Mensais',
          amount: 378.00,
          createdAt: new Date('2021-12-07 08:33:00')
        },
        {
          id: 4,
          title: 'Internet',
          type: 'withdraw',
          category: 'Despesas Fixas Mensais',
          amount: 110.00,
          createdAt: new Date('2021-12-07 08:33:00')
        },
        {
          id: 5,
          title: 'Assinatura RocketSeat',
          type: 'withdraw',
          category: 'Despesas Fixas Mensais',
          amount: 68.00,
          createdAt: new Date('2021-12-07 08:33:00')
        },      
      ],
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);