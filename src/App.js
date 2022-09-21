import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function pesquisa() {
    if (input === "") {
      alert("Digite um CEP válido!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar CEP!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={pesquisa}>
          <FiSearch size={25} color="#000" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h3>CEP: {cep.cep}</h3>

          <span>logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            Cidade: {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
