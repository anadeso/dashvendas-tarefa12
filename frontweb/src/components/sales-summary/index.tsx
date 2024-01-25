import './styles.css';

import SalesSummaryCard from './sales-summary-card';
import { useEffect, useState } from 'react';
import { requestBackend } from '../../utils/requests';
import { SalesSummaryData } from '../../types/salesSummaryData';
import StoreFilter, { FilterData } from '../filter';
import { PieChartConfig } from '../../types/pieChart';
import { SalesByGender } from '../../types/salesByGender';
import { buildSalesByGenderChart } from './helpers';
import PieChartCard from '../pie-chart-card';

type ControlComponentsData = {
  filterData: FilterData;
};

const initialSummary = {
  sum: 0
};

function SalesSummary() {
  const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);

  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

  const [controlComponentData, setControlComponentData] = useState<ControlComponentsData>({
    filterData: { store: null }
  });

  const isDefined = controlComponentData.filterData.store?.id === (null || undefined);

  const handleSubmitFilter = (data: FilterData) => {
    setControlComponentData({ filterData: data });
    console.log(data);
  };

  useEffect(() => {
    requestBackend
      .get<SalesSummaryData>( //(`/sales/summary?storeId=${controlComponentData.filterData?.store?.id}`)
        isDefined
          ? `/sales/summary?storeId=0`
          : `/sales/summary?storeId=${controlComponentData.filterData?.store?.id}`
      )
      .then((response) => {
        setSummary(response.data);
      })
      .catch(() => {
        console.error('Error to fetch sales summary');
      });
  }, [controlComponentData, isDefined]);

  useEffect(() => {
    requestBackend
      .get<SalesByGender[]>(
        //`/sales/by-gender?storeId=${controlComponentData.filterData?.store?.id}`
        isDefined
          ? `/sales/by-gender?storeId=0`
          : `/sales/by-gender?storeId=${controlComponentData.filterData.store?.id}`
      )
      .then((response) => {
        const newsalesByStore = buildSalesByGenderChart(response.data);
        setSalesByGender(newsalesByStore);
      })
      .catch(() => {
        console.error('Error to fetch sales by store');
      });
  }, [controlComponentData, isDefined]);

  return (
    <>
      <div className="sales-summary-container">
        <div className="sales-summary-container-filter">
          <StoreFilter onSubmitFilter={handleSubmitFilter} />
        </div>
        <div className="sales-summary-container-report base-card">
          <div className="sales-summary-container-card">
            <SalesSummaryCard value={summary.sum} />
          </div>
          <div className="sales-summary-chart">
            <PieChartCard name="" labels={salesByGender?.labels} series={salesByGender?.series} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesSummary;
