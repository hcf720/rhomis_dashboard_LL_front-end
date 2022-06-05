var ROOT_PATH =
  'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

myChart.showLoading();
$.get(
  ROOT_PATH + '/data/asset/data/obama_budget_proposal_2012.list.json',
  function (obama_budget_2012) {
    myChart.hideLoading();
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      legend: {
        data: [ 'Budget 2011', 'Budget 2012'],
        itemGap: 5
      },
      grid: {
        top: '12%',
        left: '1%',
        right: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: obama_budget_2012.names
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Budget (million USD)',
          axisLabel: {
            formatter: function (a) {
              a = +a;
              return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
            }
          }
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 94,
          end: 100
        },
        {
          type: 'inside',
          start: 94,
          end: 100
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
      series: [
        {
          name: 'Budget 2011',
          type: 'bar',
          stack: 'budget',
          data: obama_budget_2012.budget2011List,
          emphasis: {
            focus: 'series'
          }
        },
        {
          name: 'Budget 2012',
          type: 'bar',
          stack: 'budget',
          data: obama_budget_2012.budget2012List,
          emphasis: {
            focus: 'series'
          }
        }
      ]
    };
    myChart.setOption(option);
  }
);

option && myChart.setOption(option);
