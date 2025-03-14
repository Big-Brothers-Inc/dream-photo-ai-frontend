import React from 'react';
import './ModelSelector.css';

const ModelSelector = ({ models, selectedModel, onSelectModel }) => {
  if (!models || models.length === 0) {
    return (
      <div className="model-selector empty">
        <p>У вас еще нет обученных моделей. Загрузите фотографии в боте, чтобы обучить свою первую модель.</p>
      </div>
    );
  }

  return (
    <div className="model-selector">
      <h2>Выберите модель</h2>
      <div className="models-grid">
        {models.map(model => (
          <div 
            key={model.id}
            className={`model-card ${selectedModel && selectedModel.id === model.id ? 'selected' : ''}`}
            onClick={() => onSelectModel(model)}
          >
            {model.preview_url ? (
              <img 
                src={model.preview_url} 
                alt={model.name} 
                className="model-preview" 
              />
            ) : (
              <div className="model-preview-placeholder">
                <span>Нет превью</span>
              </div>
            )}
            <div className="model-info">
              <h3>{model.name}</h3>
              <p className={`model-status status-${model.status}`}>
                {model.status === 'ready' ? 'Готова к использованию' : 
                 model.status === 'training' ? 'В процессе обучения' : 
                 model.status === 'error' ? 'Ошибка обучения' : 'Создана'}
              </p>
              <p className="model-trigger">Триггер: {model.trigger_word}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector; 