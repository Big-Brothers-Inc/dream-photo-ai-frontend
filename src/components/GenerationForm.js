import React, { useState } from 'react';
import './GenerationForm.css';
import { generateImage } from '../services/api';

const GenerationForm = ({ model, tokens }) => {
  const [prompt, setPrompt] = useState('');
  const [numOutputs, setNumOutputs] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt) {
      setError('Пожалуйста, введите запрос для генерации');
      return;
    }
    
    if (tokens < numOutputs) {
      setError(`У вас недостаточно токенов. Необходимо: ${numOutputs}, доступно: ${tokens}`);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Добавляем триггер-слово, если его нет в запросе
      const fullPrompt = prompt.includes(model.trigger_word) 
        ? prompt 
        : `${model.trigger_word}, ${prompt}`;
      
      const generatedImages = await generateImage(model.id, fullPrompt, numOutputs);
      
      setResults(generatedImages);
      setLoading(false);
    } catch (err) {
      setError('Ошибка при генерации изображения. Пожалуйста, попробуйте позже.');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="generation-form">
      <h2>Генерация изображения</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="prompt">Запрос для генерации:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Опишите желаемое изображение (триггер-слово ${model.trigger_word} будет добавлено автоматически)`}
            rows={4}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="numOutputs">Количество изображений:</label>
          <select
            id="numOutputs"
            value={numOutputs}
            onChange={(e) => setNumOutputs(parseInt(e.target.value))}
          >
            <option value={1}>1 изображение (1 токен)</option>
            <option value={2}>2 изображения (2 токена)</option>
            <option value={4}>4 изображения (4 токена)</option>
          </select>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="generate-button"
          disabled={loading || tokens < numOutputs}
        >
          {loading ? 'Генерация...' : 'Сгенерировать'}
        </button>
      </form>
      
      {results.length > 0 && (
        <div className="generation-results">
          <h3>Результаты генерации:</h3>
          <div className="results-grid">
            {results.map((imageUrl, index) => (
              <div key={index} className="result-item">
                <img src={imageUrl} alt={`Сгенерированное изображение ${index + 1}`} />
                <a href={imageUrl} download target="_blank" rel="noopener noreferrer" className="download-button">
                  Скачать
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationForm; 