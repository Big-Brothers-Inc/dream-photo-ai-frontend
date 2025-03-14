import React from 'react';
import './BalanceDisplay.css';

const BalanceDisplay = ({ tokens, referralTokens }) => {
  return (
    <div className="balance-display">
      <div className="balance-item">
        <span className="balance-label">Токены:</span>
        <span className="balance-value">{tokens}</span>
      </div>
      
      {referralTokens > 0 && (
        <div className="balance-item referral">
          <span className="balance-label">Реферальные токены:</span>
          <span className="balance-value">{referralTokens}</span>
        </div>
      )}
      
      <div className="balance-info">
        <span>1 токен = 1 изображение</span>
      </div>
    </div>
  );
};

export default BalanceDisplay; 