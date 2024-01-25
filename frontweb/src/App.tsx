import './App.css';
import Header from '../src/components/header';
import {} from '../src/types/store';

import SalesSummary from '../src/components/sales-summary';

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <SalesSummary />
      </div>
    </>
  );
}

export default App;