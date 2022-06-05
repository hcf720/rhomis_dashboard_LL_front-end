var ROOT_PATH =
    'http://localhost:3000/api/data/livelihood';

var chartDom = document.getElementById('stacked_bar');
var bar = echarts.init(chartDom);
var option;

bar.showLoading();
$.get(
    ROOT_PATH + '/stacked_bar',
    function (stacked_bar_data) {
        bar.hideLoading();
        option = {
            title: {
                text: 'Total value of activities',
                subtext: 'Global',
                left: 'center'
              },
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
                    // magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            legend: {
                show: false,
                itemGap: 10,
            },
            grid: {
                top: '12%',
                left: '1%',
                right: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    show: false,
                    type: 'category',
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '$ per MAE per day',
                    nameTextStyle: {
                        align: 'left',
                    },
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
                    start: 70,
                    end: 74
                },
                {
                    type: 'inside',
                    start: 84,
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
            dataset: [{
                dimensions: [
                    'id_unique',
                    'income_crop_ppp_per_mae_per_d',
                    'income_lstk_ppp_per_mae_per_d',
                    'income_off_farm_ppp_per_mae_per_d',
                    'consumed_crop_ppp_per_mae_per_d',
                    'consumed_lstk_ppp_per_mae_per_d',
                    'tva_ppp_per_mae_per_d'
                ],
                source: stacked_bar_data
            },
            {
                transform: {
                    type: 'sort',
                    config: { dimension: 'tva_ppp_per_mae_per_d', order: 'asc' }
                }
            },
            ],
            series: [
                {
                    name: 'Crops Income',
                    type: 'bar',
                    stack: 's',
                    datasetIndex: 1,
                    emphasis: {
                        focus: 'series'
                    }
                },
                {
                    name: 'Livestock Income',
                    type: 'bar',
                    stack: 's',
                    datasetIndex: 1,
                    emphasis: {
                        focus: 'series'
                    }
                },
                {
                    name: 'Off Farm Income',
                    type: 'bar',
                    stack: 's',
                    datasetIndex: 1,
                    emphasis: {
                        focus: 'series'
                    }
                },
                {
                    name: 'Crops Consumed',
                    type: 'bar',
                    stack: 's',
                    datasetIndex: 1,
                    emphasis: {
                        focus: 'series'
                    }
                },
                {
                    name: 'Livestock Consumed',
                    type: 'bar',
                    stack: 's',
                    datasetIndex: 1,
                    emphasis: {
                        focus: 'series'
                    }
                },
            ]
        };
        bar.setOption(option);
    }
);

option && bar.setOption(option);
