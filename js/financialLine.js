var myChart = echarts.init(document.getElementById('chart'));
option = {
    title:{
        name:'收支圖表'
    },
    legend:{
        icon:'line',
        orient:'horizontal',
        data:['收入','支出','盈餘'],
        itemGap:20,
        textStyle:{
            fontSize:20
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '收入',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330,220, 182, 191, 234, 290, 330]
        },        
        {
            name: '支出',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 120, 132, 101, 134, 90, 230]
        },
        {
            name: '盈餘',
            type: 'line',
            data: [100, 50, 90, 100, 200, 100, 150, 132, 90, 134, 60, 20]
        },
    ]
};
myChart.setOption(option);