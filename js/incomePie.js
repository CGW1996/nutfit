var incomeChart = echarts.init(document.getElementById('incomeChart'));
let bgColor = 'transparent';
let title = '社區總收入';
let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
let echartData = [{
        name: "管理費",
        value: 300000
    },
    {
        name: "廣告",
        value: 30000
    },
    {
        name: "活動",
        value: 9000
    },
    {
        name: "場地租借",
        value: 95000
    }
];

let formatNumber = function(num) {
    let reg = /(?=(\B)(\d{3})+$)/g;
    return num.toString().replace(reg, ',');
}
let total = echartData.reduce((a, b) => {
    return a + b.value * 1
}, 0);

option = {
    backgroundColor: bgColor,
    color: color,
    legend: {
        data: ['管理費', '廣告', '活動', '場地租借']
    },
    title: [{
        text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
        top: 'center',
        left: 'center',
        textStyle: {
            rich: {
                name: {
                    fontSize: 14,
                    fontWeight: 'normal',
                    color: '#666666',
                    padding: [10, 0]
                },
                val: {
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#333333',
                }
            }
        }
    }, {
        text: '單位：元',
        top: 20,
        left: 20,
        textStyle: {
            fontSize: 14,
            color: '#666666',
            fontWeight: 400
        }
    }],
    tooltip: {
        trigger: 'item'
    },
    series: [{
        type: 'pie',
        radius: ['45%', '60%'],
        center: ['50%', '50%'],
        data: echartData,
        hoverAnimation: false,
        itemStyle: {
            normal: {
                borderColor: bgColor,
                borderWidth: 2
            }
        },
        labelLine: {
            normal: {
                length: 20,
                length2: 150,
                lineStyle: {
                    color: 'black'
                }
            }
        },
        label: {
            normal: {
                formatter: params => {
                    var percent = 0;
                    var sum = 0;
                    for (let i = 0; i < echartData.length; i++) {
                        sum += echartData[i].value;
                    }
                    console.log(sum);
                    percent = ((params.value / sum) * 100).toFixed(0);
                    return (
                        '{icon|●}{name|' + params.name + '}{value|' +
                        formatNumber(params.value) + '  ' + percent + '%}'
                    );
                },
                padding: [0, -100, 25, -100],
                rich: {
                    icon: {
                        fontSize: 16
                    },
                    name: {
                        fontSize: 20,
                        padding: [0, 10, 0, 4],
                        color: '#666666'
                    },
                    value: {
                        fontSize: 18,
                        color: '#333333'
                    },
                }
            }
        },
    }]
};
incomeChart.setOption(option);