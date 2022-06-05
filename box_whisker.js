var ROOT_PATH =
    'http://localhost:3000/api/data/livelihood';

var chartDom = document.getElementById('box_whisker');
var box = echarts.init(chartDom);
var option;

box.showLoading();
$.get(
    ROOT_PATH + '/box_whisker',
    function (box_whisker_data) {
        box.hideLoading();
        option = {
            title: [
              {
                text: 'Annual Value per MAE',
                left: 'center'
              },
              {
                text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
                borderColor: '#999',
                borderWidth: 1,
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 14,
                  lineHeight: 20
                },
                left: '10%',
                top: '90%'
              }
            ],
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    // magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            dataset: [
              {
                // prettier-ignore
                source: Object.values(box_whisker_data)
              },
              {
                transform: {
                  type: 'boxplot',
                //   config: { itemNameFormatter: 'expr {value}' }
                  config: { itemNameFormatter: (e) => Object.keys(box_whisker_data)[e.value].replace('_ppp_per_mae','') }
                }
              },
              {
                fromDatasetIndex: 1,
                fromTransformResult: 1
              }
            ],
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '10%',
              right: '10%',
              bottom: '15%'
            },
            xAxis: {
              type: 'category',
              boundaryGap: true,
              nameGap: 30,
              splitArea: {
                show: false
              },
              splitLine: {
                show: false
              }
            },
            yAxis: {
              type: 'value',
              name: '$',
              splitArea: {
                show: true
              }
            },
            series: [
              {
                name: 'boxplot',
                type: 'boxplot',
                datasetIndex: 1
              },
              {
                name: 'outlier',
                type: 'scatter',
                datasetIndex: 2
              }
            ]
          };
       
        box.setOption(option);
    }
);

option && box.setOption(option);
