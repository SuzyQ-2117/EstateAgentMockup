import AllBuyers from './components/AllBuyers';
import AllSellers from './components/AllSellers';
import Data from './data/Data.json';
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
          <AllBuyers />
          <AllSellers />
            <div className="customer-grid">
              {Data.map((item) => (
                <AllBuyers
                ID={item.ID}
                FirstName={item.FirstName}
                SurName={item.SurName}
                />,
                <AllSellers
                ID={item.ID}
                FirstName={item.FirstName}
                SurName={item.SurName}
                />
              ))}
            </div>
      </main>
    </div>
  );
}

export default App;
