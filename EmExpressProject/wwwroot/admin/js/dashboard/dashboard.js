//import { options } from "toastr";

$(document).ready(() => {

    getStatisticByContractTypes($("#statisticByContractTypesNeto")[0], $("#net-salaries-employee-types-url").val(), null);
    getStatisticByContractTypes($("#statisticByContractTypesGross")[0], $("#gross-salaries-employee-types-url").val(), null);
    $("#year-t-n").change(function () {
        getStatisticByContractTypes($("#statisticByContractTypesNeto")[0], $("#net-salaries-employee-types-url").val(), $("#year-t-n").val());
    });
    $("#year-t-g").change(function () {
        getStatisticByContractTypes($("#statisticByContractTypesGross")[0], $("#gross-salaries-employee-types-url").val(), $("#year-t-g").val());
    });

    getMonthlySalaryTotal($("#monthlyNetSalaryTotal")[0], $("#net-salaries-month-url").val(), null);
    getMonthlySalaryTotal($("#monthlyGrossSalaryTotal")[0], $("#gross-salaries-month-url").val(), null);
    $("#year-m-n").change(function () {
        getMonthlySalaryTotal($("#monthlyNetSalaryTotal")[0], $("#net-salaries-month-url").val(), $("#year-m-n").val());
    });
    $("#year-m-g").change(function () {
        getMonthlySalaryTotal($("#monthlyGrossSalaryTotal")[0], $("#gross-salaries-month-url").val(), $("#year-m-g").val());
    });

    if ($("#has-access-to-daily-stats").val())
        Get({}, $("#daily-stats-url").val()).done(function (response) {
            if (response.status == 0) {
                var data = response.data[0];
                $("#employees").html(data.employees);
                $("#in-vacation").html(data.inVacation);
                $("#not-present").html(data.notPresent);
                $("#in-time").html(data.inTime);
                $("#late").html(data.late);
            }
        });

    getStatisticByEmployeeType($("#stat-employee-type-url").val());

});
//let monthlyStatsByStatusChart = document.getElementById("monthlySalaryTotal");

getMonthlySalaryTotal = (chartElement, url, year) => {

    Get({ year }, url)
        .done(function (response) {

            var years = [];
            if (year > 0)
                years = ['product'].concat(year + '');
            else
                years = ['product'].concat(response.data.map(x => x.year + ''));

            var january = [localizedStrings.january].concat(response.data.map(x => x.january));
            var february = [localizedStrings.february].concat(response.data.map(x => x.february));
            var march = [localizedStrings.march].concat(response.data.map(x => x.march));
            var april = [localizedStrings.april].concat(response.data.map(x => x.april));
            var may = [localizedStrings.may].concat(response.data.map(x => x.may));
            var june = [localizedStrings.june].concat(response.data.map(x => x.june));
            var july = [localizedStrings.july].concat(response.data.map(x => x.july));
            var august = [localizedStrings.august].concat(response.data.map(x => x.august));
            var september = [localizedStrings.september].concat(response.data.map(x => x.september));
            var october = [localizedStrings.october].concat(response.data.map(x => x.october));
            var november = [localizedStrings.november].concat(response.data.map(x => x.november));
            var december = [localizedStrings.december].concat(response.data.map(x => x.december));

            var data = [];
            data.push(years, january, february, march, april, may, june, july, august, september, october, november, december);

            var series = [];
            for (var i = 1; i < data[0].length; i++)
                series.push({ type: 'bar' });

            var myChart = echarts.init(chartElement);
            var app = {};
            option = null;
            option = {
                legend: {},
                tooltip: {},
                dataset: {
                    source: data
                },
                xAxis: { type: 'category' },
                yAxis: {},
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            window.addEventListener('resize', function () {
                myChart.resize();
            })
        });
}
getStatisticByContractTypes = (chartElement, url, year) => {
    var data = [];
    Get({ year }, url)
        .done(function (response) {

            if (response.status == 0)
                response.data.forEach(item => {
                    data.push(
                        {
                            name: item.employeeType,
                            type: 'line',
                            stack: item.id,
                            data: [item.january, item.february, item.march, item.april, item.may, item.june, item.july, item.august, item.september, item.october, item.november, item.december]
                        }
                    );
                });

            var myChart = echarts.init(chartElement);
            var app = {};
            option = null;
            option = {
                //title: {
                //    text: 'test'
                //},
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['1', '2', '2', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                //toolbox: {
                //    feature: {
                //        saveAsImage: {}
                //    }
                //},
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [
                        localizedStrings.january,
                        localizedStrings.february,
                        localizedStrings.march,
                        localizedStrings.april,
                        localizedStrings.may,
                        localizedStrings.june,
                        localizedStrings.july,
                        localizedStrings.august,
                        localizedStrings.september,
                        localizedStrings.october,
                        localizedStrings.november,
                        localizedStrings.december
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: data
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            window.addEventListener('resize', function () {
                myChart.resize();
            })
        });
}

getStatisticByEmployeeType = (url) => {
    GetEmpty(url)
        .done(function (response) {
            if (response.status == 0) {
                var seriesData = [];

                response.data.forEach(item => {
                    seriesData.push(
                        {
                            name: item.title,
                            value: item.total
                        }
                    );
                });

                var dom = document.getElementById("employeeByType");
                var myChart = echarts.init(dom);
                option = null;

                var chartPosition = $(window).width() > 1200 ? ['50%', '50%'] : ['40%', '50%'];

                option = {
                    title: {
                        text: '',
                        subtext: '',
                        left: ''
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data: response.data.map(item => item.title),

                        selected: {}
                    },
                    series: [
                        {
                            name: 'Tipi kontratës',
                            type: 'pie',
                            radius: '70%',
                            center: chartPosition,
                            data: seriesData,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }

                window.addEventListener('resize', function () {
                    myChart.resize();
                })
            }
        });
}

showEmployeeStatsGirdModal = (id) => {
    GetEmpty($("#employee-stat-url").val() + "/" + id)
        .done(function (response) {
            $("#modal-result").html(response);
            $("#employee-stats-modal").modal("show");
        });
}