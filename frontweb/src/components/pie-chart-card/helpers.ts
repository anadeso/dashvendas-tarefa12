import { ApexOptions } from 'apexcharts';

export const buildPieChartConfig = (labels: string[] = [], name: string) => {
  return {
    labels,
    noData: {
      text: 'Sem resultados',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#FFF',
        fontSize: '18px',
        fontFamily: 'Roboto, sans-serif'
      }
    },
    colors: ['#FF7A00', '#7234F5', '#F00', '#ff6b72'],
    legend: {
      show: true,
      floating: false,
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 15,
      labels: {
        colors: '#8D8D8D'
      },
      fontFamily: 'Roboto, sans-serif',
      fontSize: '18px',
      markers: {
        offsetX: -5
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5
      }
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      pie: {
        size: 160,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 10,
              formatter: function () {
                return name;
              }
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: '24px',
              color: '#ABB1C0',
              fontFamily: 'Roboto, sans-serif',
              formatter: function () {
                return '';
              }
            }
          }
        }
      }
    },
    chart: {
      height: '160'
    }
  } as ApexOptions;
};
