var myChart = echarts.init(document.getElementById('gasChart'));
option = {
    tooltip: {
        trigger: 'axis',
    },

    legend: {
        data: ['2020', '2019']
    },
    xAxis: [{
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisPointer: {
            type: 'shadow'
        }
    }],
    yAxis: [{
        type: 'value',
        name: '金額',
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
            formatter: '{value}度'
        }
    }],
    series: [{
            name: '2020',
            type: 'bar',
            data: [50, 49, 70, 23, 26, 17, 16, 16, 32, 20, 64, 23],
            color: '#2FDE2F'
        },
        {
            name: '2019',
            type: 'bar',
            data: [26, 59, 90, 76, 98, 12, 17, 18, 48, 88, 36, 63],
            color: '#F64A2C'
        }
    ]
};
myChart.setOption(option);