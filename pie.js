var ROOT_PATH =
    'http://localhost:3000/api/data/livelihood';

var chartDom = document.getElementById('pie');
var p = echarts.init(chartDom);
var option;

p.showLoading();
$.get(
    ROOT_PATH + '/pie',
    function (pie_data) {
        p.hideLoading();
        option = {
            title: {
              text: '% of sample earning',
              subtext: 'per MAE per day',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                type: 'pie',
                radius: '50%',
                data: pie_data,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        p.setOption(option);
    }
);

option && p.setOption(option);
