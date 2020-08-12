let year = new Date().getFullYear();
let month;
for(let i = year;i>2016;i--){
    let yearList = document.createElement("option",i);
    yearList.innerHTML = i;
    document.querySelector("#selectYear").append(yearList);
}
var selectedY = $("#selectYear").val();
$("#selectYear").change(function(){
    var selectedY = $("#selectYear").val();
    console.log(selectedY);
})
for(let i = 1;i<13;i++){
    month = document.createElement("option",i);
    // month.setAttribute("id", i);
    month.innerHTML = i;
    document.querySelector("#selectMonth").append(month);
}





var piChart = echarts.init(document.getElementById('piChart'));
let bgColor = 'transparent';
let payTitle = '社區總支出';
let incomeTitle = '社區總收入';
let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
let payChartData = [{
        name: "修繕",
        value: 4000
    },
    {
        name: "雜費",
        value: 3000
    },
    {
        name: "人事",
        value: 9000
    },
    {
        name: "活動",
        value: 1250
    }
];
let incomeChartData = [{
        name: "廣告",
        value: 30000
    },
    {
        name: "管理費",
        value: 300000
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
let payTotal = payChartData.reduce((a, b) => {
    return a + b.value * 1
}, 0);
let incomeTotal = incomeChartData.reduce((a, b) => {
    return a + b.value * 1
}, 0);

option = {
    backgroundColor: bgColor,
    color: color,
    title: [{
            text: '{name|' + payTitle + '}\n{val|' + formatNumber(payTotal) + '}',
            top: 'center',
            left: '15%',
            textStyle: {
                rich: {
                    name: {
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#333333',
                        padding: [10, 22],
                    },
                    val: {
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#333333',
                        padding: [0, 0, 0, 25]
                    }
                }
            }
        }, {
            text: '{name|' + incomeTitle + '}\n{val|' + formatNumber(incomeTotal) + '}',
            top: 'center',
            left: '66.5%',
            textStyle: {
                rich: {
                    name: {
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: '#333333',
                        padding: [10, 22],
                    },
                    val: {
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: '#333333',
                        padding: [0, 0, 0, 25]
                    }
                }
            }
        },
        {
            text: '單位：元',
            top: 20,
            left: 20,
            textStyle: {
                fontSize: 14,
                color: '#666666',
                fontWeight: 400
            }
        }
    ],
    tooltip: {
        trigger: 'item'
    },
    series: [{
        type: 'pie',
        avoidLabelOverlap: true,
        // clockWise: false,
        radius: ['45%', '55%'],
        center: ['22%', '50%'],
        data: payChartData,
        hoverOffset: 15,
        itemStyle: {
            normal: {
                borderColor: bgColor,
                borderWidth: 2
            }
        },
        labelLine: {
            normal: {
                length: 20,
                length2: 100,
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
                    for (let i = 0; i < payChartData.length; i++) {
                        sum += payChartData[i].value;
                    }
                    console.log(sum);
                    percent = ((params.value / sum) * 100).toFixed(0);
                    return (
                        '{icon|●}{name|' + params.name + '}{value|' +
                        formatNumber(params.value) + '\n\n' + percent + '%}'
                    );
                },
                padding: [30, -100, 25, -100],
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
                    }
                }
            }
        },
    }, {
        type: 'pie',
        avoidLabelOverlap: true,
        minAngle: 0,
        radius: ['45%', '55%'],
        center: ['73.5%', '50%'],
        data: incomeChartData,
        hoverOffset: 15,
        itemStyle: {
            normal: {
                borderColor: bgColor,
                borderWidth: 2
            }
        },
        labelLine: {
            normal: {
                length: 20,
                length2: 100,
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
                    for (let i = 0; i < incomeChartData.length; i++) {
                        sum += incomeChartData[i].value;
                    }
                    console.log(sum);
                    percent = ((params.value / sum) * 100).toFixed(0);
                    return (
                        '{icon|●}{name|' + params.name + '}{value|' +
                        formatNumber(params.value) + "\n\n" + percent + '%}'
                    );
                },
                padding: [30, -100, 25, -100],
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
                    }
                }
            }
        },
    }]
};
piChart.setOption(option);