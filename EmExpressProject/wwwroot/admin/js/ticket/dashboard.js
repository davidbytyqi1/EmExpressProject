let app = {};
let dailyStatsByStatusChart = document.getElementById('dailyStatsByStatus');
let dailyStatsByTypesChart = document.getElementById('dailyStatsByTypes');
let monthlyStatsByStatusChart = document.getElementById("monthlyStatsByStatus");
let colors = ["#00796B", "#7B1FA2", "#FF5722", "#388E3C", "#03A9F4", "#303F9F", "#FFC107", "#757575", "#7C4DFF"];
const getChartColors = sizeLimit => {
    let i = 1;
    let pickedColors = [];
    while (i <= sizeLimit) {
        let color = colors[Math.floor(Math.random() * colors.length)];
        if (pickedColors.indexOf(color) == -1) {
            pickedColors.push(color);
            i++;
        }
    }
    return pickedColors;
}

$(document).ready(() => {
    getDailyTicketStatsByStatus(dailyStatsByStatusChart, null);
    setTimeout(() => getDailyTicketStatsByTypes(dailyStatsByTypesChart, null), 100);
    setTimeout(() => getMonthlyTicketStatsByStatus(monthlyStatsByStatusChart, null), 200);
});

getDailyTicketStatsByStatus = (chartElement, IDUser) => {
    if ($(chartElement).children().length > 0)
        echarts.dispose(chartElement);

    GetWithoutLoader({ IDUser }, '/Tickets/DailyTicketStatsByStatus').then(data => {
        if (!data) {
            chartError(chartElement);
            return;
        }
        getChartData = () => {
            let dataObject = {};
            let dataCollection = [], scatterCollection = [];
            data.forEach(d => {
                let collection = {
                    scatter: [],
                    data: []
                };
                let jsonData = JSON.parse(d).Data;
                jsonData.forEach(e => { collection.scatter.push(+JSON.parse(e).Count); collection.data.push({ value: +JSON.parse(e).Count, name: JSON.parse(e).Status }) });
                collection.scatter.unshift(echarts.number.parseDate(JSON.parse(jsonData[0]).Date));

                scatterCollection.push(collection.scatter);
                dataCollection.push(collection.data);
            });
            dataObject.data = dataCollection;
            dataObject.scatterData = scatterCollection;
            return dataObject;
        }

        let mainData = getChartData();

        var myChart = echarts.init(chartElement);
        var cellSize = [80, 80];
        var pieRadius = 30;

        getPieSeries = (scatterData, data, chart) => {
            return echarts.util.map(scatterData, function (item, index) {
                let scatterItem = data[index];
                var center = chart.convertToPixel('calendar', item);
                return {
                    id: index + 'pie',
                    type: 'pie',
                    center: center,
                    labelLine: { smooth: true },
                    label: {
                        normal: {
                            formatter: '{c}',
                            position: 'inside'
                        },
                    },
                    radius: pieRadius,
                    data: scatterItem
                };
            });
        }

        getPieSeriesUpdate = (scatterData, chart) => {
            return echarts.util.map(scatterData, function (item, index) {
                var center = chart.convertToPixel('calendar', item);
                return {
                    id: index + 'pie',
                    center: center
                };
            });
        }
        option = {
            tooltip: {},
            //color: getChartColors(JSON.parse(data[0]).Data.length),
            legend: {
                data: Array.from(JSON.parse(data[0]).Data, i => JSON.parse(i).Status),
                orient: 'horizontal',
                bottom: 2,
                left: 'center'
            },
            calendar: {
                top: 'middle',
                left: 'center',
                orient: 'vertical',
                cellSize: cellSize,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: "#ccc",
                },
                yearLabel: {
                    show: false,
                    textStyle: {
                        fontSize: 30
                    }
                },
                dayLabel: {
                    show: false,
                    margin: 25,
                    firstDay: 1,
                },
                monthLabel: {
                    show: false
                },
                range: [new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1)]
            },
            series: [{
                id: 'label',
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 1,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: "#ccc",
                },
                label: {
                    normal: {
                        show: true,
                        formatter: params => {
                            return echarts.format.formatTime('dd', params.value[0]);
                        },
                        offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                        textStyle: {
                            color: '#000',
                            fontSize: 14
                        }
                    }
                },
                data: mainData.data
            }]
        };

        myChart.setOption(option);
        var pieInitialized;
        setTimeout(() => {
            pieInitialized = true;
            myChart.setOption({
                series: getPieSeries(mainData.scatterData, mainData.data, myChart)
            });
        }, 10);

        app.onresize = () => {
            if (pieInitialized) {
                myChart.setOption({
                    series: getPieSeriesUpdate(mainData.data, myChart)
                });
            }
        };
    });
}
getDailyTicketStatsByTypes = (chartElement, IDUser) => {
    if ($(chartElement).children().length > 0)
        echarts.dispose(chartElement);

    GetWithoutLoader({ IDUser }, '/Tickets/DailyTicketStatsByTypes').then(data => {
        if (!data) {
            chartError(chartElement);
            return;
        }

        getChartData = () => {
            let dataObject = {};
            let dataCollection = [], scatterCollection = [];
            data.forEach(d => {
                let collection = {
                    scatter: [],
                    data : []
                };
                let jsonData = JSON.parse(d).Data;
                jsonData.forEach(e => { collection.scatter.push(+JSON.parse(e).Count); collection.data.push({ value: +JSON.parse(e).Count, name: JSON.parse(e).Type }) });
                collection.scatter.unshift(echarts.number.parseDate(JSON.parse(jsonData[0]).Date));

                scatterCollection.push(collection.scatter);
                dataCollection.push(collection.data);
            });
            dataObject.data = dataCollection;
            dataObject.scatterData = scatterCollection;
            return dataObject;
        }

        let mainData = getChartData();

        var myChart = echarts.init(chartElement);
        var cellSize = [90, 90];
        var pieRadius = 30;

        getPieSeries = (scatterData, data, chart) => {
            return echarts.util.map(scatterData, function (item, index) {
                let scatterItem = data[index];
                var center = chart.convertToPixel('calendar', item);
                return {
                    id: index + 'pie',
                    type: 'pie',
                    center: center,
                    labelLine: { smooth: true },
                    label: {
                        normal: {
                            formatter: '{c}',
                            position: 'inside'
                        },
                    },
                    radius: pieRadius,
                    data: scatterItem
                };
            });
        }

        getPieSeriesUpdate = (scatterData, chart) => {
            return echarts.util.map(scatterData, function (item, index) {
                var center = chart.convertToPixel('calendar', item);
                return {
                    id: index + 'pie',
                    center: center
                };
            });
        }
        option = {
            tooltip: {},
            //color: getChartColors(JSON.parse(data[0]).Data.length),
            legend: {
                data: Array.from(JSON.parse(data[0]).Data, i => JSON.parse(i).Type),
                orient: 'horizontal',
                bottom: 2,
                left: 'center'
            },
            calendar: {
                top: 'middle',
                left: 'center',
                orient: 'vertical',
                cellSize: cellSize,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: "#ccc",
                },
                yearLabel: {
                    show: false,
                    textStyle: {
                        fontSize: 30
                    }
                },
                dayLabel: {
                    show: false,
                    margin: 25,
                    firstDay: 1,
                },
                monthLabel: {
                    show: false
                },
                range: [new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1)]
            },
            series: [{
                id: 'label',
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 1,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: "#ccc",
                },
                label: {
                    normal: {
                        show: true,
                        formatter: params => {
                            return echarts.format.formatTime('dd', params.value[0]);
                        },
                        offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                        textStyle: {
                            color: '#000',
                            fontSize: 14
                        }
                    }
                },
                data: mainData.scatterData
            }]
        };

        myChart.setOption(option);

        var pieInitialized;
        setTimeout(() => {
            pieInitialized = true;
            myChart.setOption({
                series: getPieSeries(mainData.scatterData, mainData.data, myChart)
            });
        }, 10);
        app.onresize = () => {
            if (pieInitialized) {
                myChart.setOption({
                    series: getPieSeriesUpdate(mainData.scatterData, myChart)
                });
            }
        };
    });
}
getMonthlyTicketStatsByStatus = (chartElement, IDUser) => {
    if ($(chartElement).children().length > 0)
        echarts.dispose(chartElement);

    GetWithoutLoader({ IDUser }, '/Tickets/MonthlyTicketStatsByStatus').then(data => {
        if (!data) {
            chartError(chartElement);
            return;
        }
        var myChart = echarts.init(chartElement);
        var posList = [
            'left', 'right', 'top', 'bottom',
            'inside',
            'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
            'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ];

        app.configParameters = {
            rotate: {
                min: -90,
                max: 90
            },
            align: {
                options: {
                    left: 'left',
                    center: 'center',
                    right: 'right'
                }
            },
            verticalAlign: {
                options: {
                    top: 'top',
                    middle: 'middle',
                    bottom: 'bottom'
                }
            },
            position: {
                options: echarts.util.reduce(posList, function (map, pos) {
                    map[pos] = pos;
                    return map;
                }, {})
            },
            distance: {
                min: 0,
                max: 100
            }
        };

        app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
                var labelOption = {
                    normal: {
                        rotate: app.config.rotate,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        position: app.config.position,
                        distance: app.config.distance
                    }
                };
                myChart.setOption({
                    series: [{
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }]
                });
            }
        };


        var labelOption = {
            show: true,
            position: app.config.position,
            distance: app.config.distance,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            rotate: app.config.rotate,
            formatter: '{c}  {name|{a}}',
            fontSize: 16,
            rich: {
                name: {
                    textBorderColor: '#fff'
                }
            }
        };
        let newData = [];
        data.forEach(d => newData.push(JSON.parse(d)));
        newData.forEach(d => d.label = labelOption);

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: Array.from(newData, i => i.name)
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: { show: false },
                    data: Array(parseInt(new Date().getMonth() + 1)).fill().map((element, index) => index + 1)
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: newData
        };
        if (option && typeof option === "object")
            myChart.setOption(option, true);
       
    });
}

const chartError = chartElement => {
    $('<span class="error-emoji d-flex flex-column align-items-center mt-4">Një gabim ka ndodhur, kontaktoni administratorin</span>').insertAfter($("#" + chartElement.id).parent());
    $("#" + chartElement.id).parent().remove();
}