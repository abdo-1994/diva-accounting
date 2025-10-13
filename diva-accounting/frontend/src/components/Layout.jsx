import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Diva Accounting</h2>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/services">Services</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/invoices">Invoices</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/gift-cards">Gift Cards</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/users">Users</Link>
          <Link to="/help">دليل المستخدم</Link>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
