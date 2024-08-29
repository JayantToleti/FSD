import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useAppSelector } from '../../redux/hooks/index';

export const Graphics = () => {

  const { list } = useAppSelector(state => state.socketsState);

  const [graphicsData, setGraphicsData] = useState({
    data: list.map(e => e.votes),
    labels: list.map(e => e.name)
  });

  useEffect(() => {
    setGraphicsData({
      data: list.map(e => e.votes),
      labels: list.map(e => e.name)
    });
  }, [list]);

  useEffect(() => {
    const ctx = document.getElementById('myChart');

    const chart = new Chart(ctx as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: graphicsData.labels,
        datasets: [{
          label: '# of Votes',
          data: graphicsData.data,
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
            stacked: true
          }
        },
      }
    });
    return () => chart.destroy();
  }, [list, graphicsData]);


  return (
    <canvas className='mx-auto min-w-screen' id='myChart'></canvas>
  );
};
