export const PRODUCTS_GRAPH_DATA = {
  type: "line",
  height: 280,
  series: [
    {
      name: "Posted products",
      data: [],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: true,
      text: "Total Posted Products in the Last 7 Months",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "inherit",
        color: "#333",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      lineCap: "round",
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [], 
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};


export const CATEGORIES_GRAPH_DATA = {
  type: "pie",
  height: 200,
  series: [],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(2)}%`, 
      style: {
        fontSize: '14px', 
        colors: ["white"], 
      },
    },
    colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
    legend: {
      show: false, 
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} products`, 
      },
    },
  },
};
