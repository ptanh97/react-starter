import 'antd/dist/antd.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Login } from './Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <FilterableProductTable
      products={[
        { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
        { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
        {
          category: 'Fruits',
          price: '$2',
          stocked: false,
          name: 'Passionfruit',
        },
        { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
        {
          category: 'Vegetables',
          price: '$4',
          stocked: false,
          name: 'Pumpkin',
        },
        { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
      ]}
    />
  <PackingList /> */}
    {/* <SyncedInputs />
    <Scoreboard /> */}
    {/* <Page /> */}
    {/* <TaskApp />
    <ImageList /> */}
    <Login />
  </React.StrictMode>
);
