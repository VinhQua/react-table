import logo from './logo.svg';
import './App.css';
import { ProductTable } from './ProductTable';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

function App() {

  return (
    <div className="App">
      <ProductTable/>
    </div>
  );
}

export default App;
