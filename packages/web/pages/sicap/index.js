import React, { useState, useEffect } from 'react';

const SicapPage = () => {
  // Estados para armazenar a localidade selecionada, o termo de pesquisa e as opções de localidades filtradas
  const [localidade, setLocalidade] = useState('Mossoró'); // Localidade padrão
  const [pesquisa, setPesquisa] = useState('');
  const [opcoesLocalidadesFiltradas, setOpcoesLocalidadesFiltradas] = useState([]);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  // Lista de localidades disponíveis
  const localidadesDisponiveis = ['Mossoró'];

  // Efeito para atualizar as opções filtradas ao iniciar a página
  useEffect(() => {
    handlePesquisaChange({ target: { value: pesquisa } });
  }, []);

  // Função para lidar com a alteração no campo de pesquisa
  const handlePesquisaChange = (event) => {
    const termoPesquisa = event.target.value;
    setPesquisa(termoPesquisa);
    // Mostra as opções apenas se houver um termo de pesquisa
    setMostrarOpcoes(Boolean(termoPesquisa));

    // Filtra as localidades com base no termo de pesquisa e as ordena
    const localidadesFiltradas = localidadesDisponiveis
      .filter((localidade) =>
        localidade.toLowerCase().includes(termoPesquisa.toLowerCase())
      )
      .sort();

    setOpcoesLocalidadesFiltradas(localidadesFiltradas);
  };

  // Função para lidar com o clique em uma opção de localidade
  const handleOpcaoLocalidadeClick = (opcao) => {
    setLocalidade(opcao);
    setPesquisa('');
    setOpcoesLocalidadesFiltradas([]);
    setMostrarOpcoes(false);
  };

  // Função para obter a URL do Power BI com base na localidade selecionada
  const getDashboardUrl = () => {
    const dashboardUrls = {
      'Mossoró': 'https://app.powerbi.com/view?r=eyJrIjoiNWVkNjVmOGItMjQ4OC00MmYwLWE1ZWYtY2M2YTFkMzdiZjEwIiwidCI6IjQ0MzBkNGIwLTRiMDktNDAxNy1hYzRmLWUwOGUxMjA2MWFmOSJ9&pageName=ReportSectionaf3a1ab93ca1eeb3f750',
    };

    return dashboardUrls[localidade] || '';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Título centralizado */}
      <div>
        <center>
          <h2 style={{ backgroundColor: '#00ad85', color: '#fff', padding: '10px 20px', margin: '0' }}>
            SICAP
          </h2>
        </center>
      </div>
      {/* Barra de Pesquisa por Nome de Localidade */}
      <div style={{ marginBottom: '20px' }}>
        {/*<label style={{ display: 'block', marginBottom: '5px' }}>Pesquisar por Localidade:</label>*/}
        <div style={{ position: 'relative' }}>
          {/* Input de pesquisa estilizado */}
          <input
            type="text"
            value={pesquisa}
            onChange={handlePesquisaChange}
            placeholder="Digite o nome da localidade..."
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              outline: 'none',
              margin: '10px 0',
            }}
          />
          {/* Lista de Opções de Localidades Filtradas */}
          {mostrarOpcoes && opcoesLocalidadesFiltradas.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                right: '0',
                zIndex: '1',
                listStyle: 'none',
                padding: '0',
                margin: '0',
                border: '1px solid #ccc',
                borderRadius: '5px',
                background: '#fff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {opcoesLocalidadesFiltradas.map((opcao) => (
                <li
                  key={opcao}
                  onClick={() => handleOpcaoLocalidadeClick(opcao)}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  {opcao}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Exibe o iframe do Power BI com base na localidade selecionada */}
      {localidade !== '' && (
        <>
          <iframe
            title="Report Section"
            width="100%"
            height="500"
            src={getDashboardUrl()}
            frameBorder="0"
            allowFullScreen="true"
            style={{ marginBottom: '20px' }}
          ></iframe>
        </>
      )}
      {/* Texto informativo fixo */}
      <div style={{ textAlign: 'center' }}>
        {/* Texto informativo fixo centralizado */}
      </div>
    </div>
  );
};

export default SicapPage;
