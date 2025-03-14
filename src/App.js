import React, { useState, useEffect } from 'react';
import './App.css';
import ModelSelector from './components/ModelSelector';
import BalanceDisplay from './components/BalanceDisplay';
import GenerationForm from './components/GenerationForm';
import { getUserModels, getUserBalance } from './services/api';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [balance, setBalance] = useState({ tokens: 0, referralTokens: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получаем параметры из URL (например, model_id)
  const urlParams = new URLSearchParams(window.location.search);
  const modelIdFromUrl = urlParams.get('model_id');

  useEffect(() => {
    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.expand();
    tg.ready();

    // Загрузка данных пользователя
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Получаем список моделей пользователя
        const modelsData = await getUserModels();
        setModels(modelsData);
        
        // Если в URL есть model_id, выбираем эту модель
        if (modelIdFromUrl) {
          const model = modelsData.find(m => m.id === parseInt(modelIdFromUrl));
          if (model) {
            setSelectedModel(model);
          }
        }
        
        // Получаем баланс пользователя
        const balanceData = await getUserBalance();
        setBalance(balanceData);
        
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [modelIdFromUrl]);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Dream Photo AI Studio</h1>
        <BalanceDisplay tokens={balance.tokens} referralTokens={balance.referralTokens} />
      </header>
      
      <main className="app-main">
        <ModelSelector 
          models={models} 
          selectedModel={selectedModel} 
          onSelectModel={handleModelSelect} 
        />
        
        {selectedModel && (
          <GenerationForm 
            model={selectedModel} 
            tokens={balance.tokens} 
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>© 2023 Dream Photo AI. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default App; 