import { BuildingStorefrontIcon, ClockIcon, InboxStackIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { DashboardStat } from "../../components/ui/DashboardStat";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";


const chartConfig = {
  type: "line",
  height: 280,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#00ff00"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
      width: 2
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
          colors: "#bfbfbf",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#bfbfbf",
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

const chartConfig2 = {
  type: "pie",
  height: 250,
  series: [44, 55, 13, 43, 22],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
    legend: {
      show: false,
    },
  },
};
export const AdminDashboard = () => {
  return (
    <div>
      <div>
        <AdminSideBar />
      </div>
      <div className="lg:ml-[21%] px-2">
        <div className="pt-6">
          <h1 className="text-3xl font-semibold">Welcome, <span className="text-blue-500">Soufian boukir</span> </h1>
        </div>
        <div className="mt-6 flex gap-6 justify-center lg:justify-start px-0 lg:gap-10 flex-wrap">
          <div className="w-[45%] lg:w-[22%] bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-6 rounded-lg">
            <DashboardStat svg={<UserGroupIcon className="h-9 w-9" />} text={"Users"} state={20}/>
          </div>
          <div className="w-[45%] lg:w-[22%] bg-gradient-to-r from-teal-400 to-teal-700 px-6 py-6 rounded-lg">
            <DashboardStat svg={<ClockIcon className="h-9 w-9" />} text={"Pending"} state={20}/>
          </div>
          <div className="w-[45%] lg:w-[22%] bg-gradient-to-r from-green-400 to-green-700 px-6 py-6 rounded-lg">
            <DashboardStat svg={<InboxStackIcon className="h-9 w-9" />} text={"Products"} state={20}/>
          </div>
          <div className="w-[45%] lg:w-[22%] bg-gradient-to-r from-gray-400 to-gray-700 px-6 py-6 rounded-lg">
            <DashboardStat svg={<BuildingStorefrontIcon className="h-9 w-9" />} text={"Stores"} state={20}/>
          </div>
        </div>
        <div className="w-[100%] lg:w-[100%] mt-6 lg:flex justify-between">
          <div className="lg:w-[65%]">
            <Card className="bg-dark">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
              >
              </CardHeader>
              <CardBody className="px-2 pb-0">
                <Chart {...chartConfig} />
              </CardBody>
            </Card>
          </div>
          <div className="lg:w-[30%] mt-4 mb-32 lg:mt-0">
            <Card className="bg-dark">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
              >
                <span className="text-white font-semibold pl-2">Poducts by categories</span>
              </CardHeader>
              <CardBody className="mt-4 grid place-items-center px-2">
                <Chart {...chartConfig2} />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
