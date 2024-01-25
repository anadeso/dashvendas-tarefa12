import { formatPrice } from '../../../utils/formatters';
import './styles.css';

import React from 'react';

type Props = {
  value: number;
};

function SalesSummaryCard({ value }: Props) {
  return (
    <div className="sales-summary-card">
      <h3 className="sales-summary-card-value">{formatPrice(value)}</h3>
      <span className="sales-summary-card-label">Total de vendas</span>
    </div>
  );
}

export default SalesSummaryCard;
