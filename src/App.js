import { useEffect } from 'react';
import './App.css';
// window.Telegram.WebApp.
const tg = window.Telegram.WebApp;
function App() {

  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      work
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
