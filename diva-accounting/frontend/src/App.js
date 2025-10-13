import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ServiceList from './components/ServiceList';
import PackageList from './components/PackageList';
import CustomerList from './components/CustomerList';
import InvoiceList from './components/InvoiceList';
import ExpenseList from './components/ExpenseList';
import GiftCardList from './components/GiftCardList';
import Settings from './components/Settings';
import UserList from './components/UserList';
import Help from './components/Help';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="services" element={<ServiceList />} />
        <Route path="packages" element={<PackageList />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="invoices" element={<InvoiceList />} />
        <Route path="expenses" element={<ExpenseList />} />
        <Route path="gift-cards" element={<GiftCardList />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<UserList />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default App;
