var myChart = echarts.init(document.getElementById('totalChart'));
option = {
    tooltip: {
        trigger: 'axis',
    },

    legend: {
        data: ['收入', '支出', '當期盈餘']
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
            max: 250000,
            interval: 50000,
            axisLabel: {
                formatter: '${value}'
            }
        },
        {
            type: 'value',
            name: '當期盈餘',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} 萬'
            }
        }
    ],
    series: [{
            name: '收入',
            type: 'bar',
            data: [50000, 49000, 70000, 232000, 26000, 17000, 16000, 162000, 32000, 20000, 64000, 233000],
            color: '#2FDE2F'
        },
        {
            name: '支出',
            type: 'bar',
            data: [26000, 59000, 90000, 76000, 98000, 120000, 175000, 182000, 48000, 88000, 36000, 63000],
            color: '#F64A2C'
        },
        {
            name: '當期盈餘',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
            color: '#2C73F6'
        }
    ]
};
myChart.setOption(option);