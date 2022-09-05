import{useState} from 'react';
import './styles.css';
import api from './services/api';

function App() {
  
  const[input, setInput] = useState('')
  const[cep, setCep] = useState({});

  async function handleSearch(){
    
    if(input.length === 1){
      alert("Preencha algum cep")

      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }
    catch{
      alert("houve um erro")
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador De Cep</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder ="Digite o cep..."  
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />
        
        <button className="buttonSearch" onClick={handleSearch}>
          Procurar
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
        <h2>Cep:{cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento} </span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

export default App;
