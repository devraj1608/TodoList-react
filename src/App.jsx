import { useState } from 'react';
import './App.css';
import Todolist from './Todolist';

function App() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  };

  return (
    <>
      <Todolist mode={mode} toggleMode={toggleMode} />
    </>
  );
}

export default App;
