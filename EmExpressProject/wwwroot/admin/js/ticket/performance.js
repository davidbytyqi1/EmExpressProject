$(document).ready(() => GetEmpty('/Home/GetResources').then(result => { window.resources = result; gridsInitialization(); }));

const getResource = key => {
    let resource = window.resources.find(r => r.key == key);
    if (!resource)
        return undefined;
    return resource.value;
};

dataFormChanger = (element, hideShowChart) => {
    let grid = $(element).closest('.card').find("[data-role='grid']").data("kendoGrid");
    let chartElementId = $(element).closest('.card').find("[data-role='chart']").css("height", 500).attr('id');
    let data = grid.dataSource.data();
    let series = [];
    const { showChart } = hideShowChart;

    [...$(element).parent().children()].forEach(item => $(item).removeClass('active'));
    $(element).addClass('active');

    if (showChart) {
        $(element).closest('.card').addClass('chart-visible');
        if ($("#" + chartElementId).children().length > 0)
            return;

        series.push({ type: "bar", name: getResource("TotalTicketsLabel"), data: Array.from(data, item => item.totalTickets) });
        series.push({ type: "bar", name: getResource("InProcessTicketsLabel"), data: Array.from(data, item => item.inProcessTickets) });
        series.push({ type: "bar", name: getResource("CompletedTicketsLabel"), data: Array.from(data, item => item.completedTickets) });

        chartInitialization({ series, legend: Array.from(data, item => item.key) }, document.getElementById(chartElementId));
    }
    else
        $(element).closest('.card').removeClass('chart-visible');
}

const gridsInitialization = () => {
    $(".collapse > div > div:not([data-role='chart'])").each(function () {
        let dataId = $(this).attr('data-id');
        $("#" + this.id).kendoGrid({
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "./ReadTicketStats",
                        dataType: "json",
                        data: function () {
                            return { statsType: dataId }
                        }
                    }
                },
                schema: {
                    model:{
                        fields: {
                            totalTickets: {
                                type: "number"
                            },
                            completedTickets: {
                                type: "number"
                            },
                            inProcessTickets: {
                                type: "number"
                            },
                            completion: {
                                type: "number"
                            },
                        }
                    }
                },
                batch: false,
                pageSize: 10,
            }),
            sortable: true,
            resizable: true,
            filterable: {
                mode: "menu",
                messages: {
                    info: getResource('FilterItemsTextLabel'),
                    filter: getResource('ApplyFilter'),
                    clear: getResource('CancelLabel')
                },
                extra: false,
                operators: {
                    string: {
                        contains: getResource('EqualLabel')
                    }
                }
            },
            selectable: ['cell', 'row'],
            toolbar: [{
                template: `<div class='d-inline-flex w-100 justify-content-end'>
                                <ul class="nav nav-tabs nav-tabs-bottom" style='border-bottom: 0 !important;'>
                                    <li class="nav-item"><button class="nav-link" data-id="0"><i class='la la-file-pdf-o'></i> PDF</button></li>
                                    <li class="nav-item"><button class="nav-link" data-id="1"><i class='la la-file-excel-o'></i> EXCEL</button></li>
                                    <li class="nav-item"><button class="nav-link" data-id="2"><i class='la la-file-excel-o'></i> CSV</button></li>
                                </ul>
                           </div>` }],
            pageable: {
                messages: {
                    display: getResource('GridDisplayLabel') + '{0}-{1}' + " " + getResource('GridTotalRecordLabel') + " " + '{2}' + " " + getResource('GridRecordLabel'),
                    empty: getResource('NoRecordsLabel')
                }
            },
            columns: [
                {
                    field: "key",
                    title: dataId == 1 ? getResource("MonthLabel") : dataId == 2 ? getResource("TeamLabel") : getResource("CategoryLabel"),
                    filterable: {
                        mode: "menu",
                        messages: {
                            info: getResource('FilterItemsTextLabel'),
                            filter: getResource('ApplyFilter'),
                            clear: getResource('CancelLabel')
                        },
                        extra: false,
                        operators: {
                            string: {
                                eq: getResource("EqualLabel"),
                                neq: getResource("NotEqualToLabel"),
                                lt: getResource("LessThanLabel"),
                                lte: getResource("LessThanOrEqualToLabel"),
                                gt: getResource("GreaterThanLabel"),
                                gte: getResource("GreaterThanOrEqualTo"),                                
                            }
                        }
                    }
                },
                {
                    field: "totalTickets",
                    title: getResource("TotalTicketsLabel"),
                    filterable: {
                        mode: "menu",
                        messages: {
                            info: getResource('FilterItemsTextLabel'),
                            filter: getResource('ApplyFilter'),
                            clear: getResource('CancelLabel')
                        },
                        extra: false,
                        operators: {
                            number: {
                                eq: getResource("EqualLabel"),
                                neq: getResource("NotEqualToLabel"),
                                lt: getResource("LessThanLabel"),
                                lte: getResource("LessThanOrEqualToLabel"),
                                gt: getResource("GreaterThanLabel"),
                                gte: getResource("GreaterThanOrEqualTo"),
                            }
                        }
                    },
                },
                {
                    field: "completedTickets",
                    title: getResource("CompletedTicketsLabel"),
                    filterable: {
                        mode: "menu",
                        messages: {
                            info: getResource('FilterItemsTextLabel'),
                            filter: getResource('ApplyFilter'),
                            clear: getResource('CancelLabel')
                        },
                        extra: false,
                        operators: {
                            number: {
                                eq: getResource("EqualLabel"),
                                neq: getResource("NotEqualToLabel"),
                                lt: getResource("LessThanLabel"),
                                lte: getResource("LessThanOrEqualToLabel"),
                                gt: getResource("GreaterThanLabel"),
                                gte: getResource("GreaterThanOrEqualTo"),
                            }
                        }
                    },
                },
                {
                    field: "inProcessTickets",
                    title: getResource("InProcessTicketsLabel"),
                    filterable: {
                        mode: "menu",
                        messages: {
                            info: getResource('FilterItemsTextLabel'),
                            filter: getResource('ApplyFilter'),
                            clear: getResource('CancelLabel')
                        },
                        extra: false,
                        operators: {
                            number: {
                                eq: getResource("EqualLabel"),
                                neq: getResource("NotEqualToLabel"),
                                lt: getResource("LessThanLabel"),
                                lte: getResource("LessThanOrEqualToLabel"),
                                gt: getResource("GreaterThanLabel"),
                                gte: getResource("GreaterThanOrEqualTo"),
                            }
                        }
                    }
                },
                {
                    attributes: {
                        "data-field": "completion"
                    },
                    field: "completion",
                    title: getResource("CompletionLabel"),
                    template: "#:completion#% ",
                    filterable: {
                        mode: "menu",
                        messages: {
                            info: getResource('FilterItemsTextLabel'),
                            filter: getResource('ApplyFilter'),
                            clear: getResource('CancelLabel')
                        },
                        extra: false,
                        operators: {
                            number: {
                                eq: getResource("EqualLabel"),
                                neq: getResource("NotEqualToLabel"),
                                lt: getResource("LessThanLabel"),
                                lte: getResource("LessThanOrEqualToLabel"),
                                gt: getResource("GreaterThanLabel"),
                                gte: getResource("GreaterThanOrEqualTo"),
                            }
                        }
                    }
                },
            ]
        });
    });
}

const chartInitialization = (data, chartElement) => {
    const { series, legend } = data;
    var dom = chartElement;
    var myChart = echarts.init(dom);
    option = null;

    var seriesLabel = {
        normal: {
            show: true,
            textBorderColor: '#333',
            textBorderWidth: 2
        }
    }

    for (let item of data.series)
        item.label = seriesLabel;

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [getResource("TotalTicketsLabel"), getResource("CompletedTicketsLabel"), getResource("InProcessTicketsLabel")]
        },
        grid: {
            left: 150
        },
        xAxis: {
            type: 'value',
            name: getResource("DaysLabel"),
            axisLabel: {
                formatter: '{value}'
            }
        },
        yAxis: {
            type: 'category',
            inverse: true,
            data: legend,
            axisLabel: {
                formatter: function (value) {
                    return '{' + value + '| }\n{value|' + value + '}';
                },
                margin: 20,
                rich: {
                    value: {
                        lineHeight: 30,
                        align: 'center'
                    },
                    Sunny: {
                        height: 40,
                        align: 'center',
                    },
                    Cloudy: {
                        height: 40,
                        align: 'center',
                    },
                    Showers: {
                        height: 40,
                        align: 'center',
                    }
                }
            }
        },
        series: series
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}