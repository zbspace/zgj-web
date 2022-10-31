const boxChart = {
  series: [
    {
      type: "boxPlot",
      data: [
        {
          x: "Jan 2015",
          y: [54, 66, 69, 75, 88],
        },
        {
          x: "Jan 2016",
          y: [43, 65, 69, 76, 81],
        },
        {
          x: "Jan 2017",
          y: [31, 39, 45, 51, 59],
        },
        {
          x: "Jan 2018",
          y: [39, 46, 55, 65, 71],
        },
        {
          x: "Jan 2019",
          y: [29, 31, 35, 39, 44],
        },
        {
          x: "Jan 2020",
          y: [41, 49, 58, 61, 67],
        },
        {
          x: "Jan 2021",
          y: [54, 59, 66, 71, 88],
        },
      ],
    },
  ],
  chartOptions: {
    chart: {
      type: "boxPlot",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Basic BoxPlot Chart",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "#25a0e2",
                    lower: "#32ccff",
        },
      },
    },
  },
};

//  Boxplot-Scatter

const boxplotScatterChart = {
  series: [
    {
      name: "Box",
      type: "boxPlot",
      data: [
        {
          x: new Date("2017-01-01").getTime(),
          y: [54, 66, 69, 75, 88],
        },
        {
          x: new Date("2018-01-01").getTime(),
          y: [43, 65, 69, 76, 81],
        },
        {
          x: new Date("2019-01-01").getTime(),
          y: [31, 39, 45, 51, 59],
        },
        {
          x: new Date("2020-01-01").getTime(),
          y: [39, 46, 55, 65, 71],
        },
        {
          x: new Date("2021-01-01").getTime(),
          y: [29, 31, 35, 39, 44],
        },
      ],
    },
    {
      name: "Outliers",
      type: "scatter",
      data: [
        {
          x: new Date("2017-01-01").getTime(),
          y: 32,
        },
        {
          x: new Date("2018-01-01").getTime(),
          y: 25,
        },
        {
          x: new Date("2019-01-01").getTime(),
          y: 64,
        },
        {
          x: new Date("2020-01-01").getTime(),
          y: 27,
        },
        {
          x: new Date("2020-01-01").getTime(),
          y: 78,
        },
        {
          x: new Date("2021-01-01").getTime(),
          y: 15,
        },
      ],
    },
  ],
  chartOptions: {
    chart: {
      type: "boxPlot",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ["#00bd9d", "#e9ebec"],
    title: {
      text: "BoxPlot - Scatter Chart",
      align: "left",
      style: {
        fontWeight: 500,
      },
    },
    xaxis: {
      type: "datetime",
      tooltip: {
        formatter: function(val) {
          return new Date(val).getFullYear();
        },
      },
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: "#eceeef",
            lower: "#25a0e2"
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
  },
};

export { boxChart, boxplotScatterChart };