import { BuildingStorefrontIcon, ClockIcon, InboxStackIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { DashboardStat } from "../../components/ui/DashboardStat";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import {
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { getAdminDashboardData } from "../../services/adminServices";
import { LinearProgress } from "@mui/material";
import { CATEGORIES_GRAPH_DATA, PRODUCTS_GRAPH_DATA } from "../../constants/graphsData";
import { Link } from "react-router-dom";
import moment from "moment";





export const AdminDashboard = () => {

  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({});  
  const [userFullName,setUserFullName] = useState('');
  const [latestJoinedUsers,setLatestJoinedUsers] = useState([]);
  const [recentlyPostedProducts,setRecentlyPostedProducts] = useState([]);
  const [states,setStates] = useState({
    totalUsers : 0,
    totalPendingProducts : 0,
    totalProducts : 0,
    totalStores : 0,
  });
  const [firstGraphData,setFirstGraphData] = useState(PRODUCTS_GRAPH_DATA);
  const [secondGraphData,setSecondGraphData] = useState(CATEGORIES_GRAPH_DATA);

  const getDashboardData = async () =>{
    setLoading(true);
    setNotification(null);
    try {
      const response = await getAdminDashboardData(localStorage.getItem('token'));
      setLoading(false)
      
      if(response.data){
        setUserFullName(response.data.userFullName);
        setStates({
          totalUsers : response.data.totalUsers,
          totalPendingProducts : response.data.totalPendingProducts,
          totalProducts : response.data.totalProducts,
          totalStores : response.data.totalStores,
        })

        setLatestJoinedUsers(response.data.recentlyRegisteredUsers);
        setRecentlyPostedProducts(response.data.recentlyPostedProducts);

        const totalsX = response.data.firstGraphData.map((item) => item.total);
        const monthsY = response.data.firstGraphData.map((item) => item.month);

        const firstFourCategories = response.data.secondGraphData.slice(0, 4);
        const others = response.data.secondGraphData.slice(4);

        const categories = [
            ...firstFourCategories.map((item) => item.categoryName),
            "Others",
        ];

        const totalProductsByCategory = [
            ...firstFourCategories.map((item) => item.total),
            others.reduce((sum, item) => sum + item.total, 0),
        ];

        setFirstGraphData((prevGraphData) => ({
          ...prevGraphData,
          series: [
            {
              ...prevGraphData.series[0],
              data: totalsX,
            },
          ],
          options: {
            ...prevGraphData.options,
            xaxis: {
              ...prevGraphData.options.xaxis,
              categories: monthsY,
            },
          },
        }));        

        setSecondGraphData((prevGraphData) => ({
          ...prevGraphData,
          series : totalProductsByCategory,
          options: {
            ...prevGraphData.options,
            labels: categories,
          },
        }));
        
      }
    } catch (error) {
      setLoading(false);
      if(error.response){
        setNotification({type: "error",message: error.response.data.message});
      }else{
        setNotification({type: "error",message: "Try again later"});
      }
    }
  }

  useEffect(() =>{
    getDashboardData();
  },[])
  
  return (
    <div>
      <div>
        <AdminSideBar />
      </div>

      <div className="lg:ml-[21%] px-2">
        <div className="mt-2">
          {
            loading && <LinearProgress />
          }
        </div>
        {
          !loading && <div>
                        <div className="pt-6">
                          <h1 className="text-3xl font-semibold">Welcome, <span className="text-blue-500">{userFullName}</span> </h1>
                        </div>
                        <div className="mt-6 flex gap-6 justify-center lg:justify-start px-0 lg:gap-10 flex-wrap">
                          <div className="w-[45%] lg:w-[22%] bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-6 rounded-lg">
                            <DashboardStat svg={<UserGroupIcon className="h-9 w-9" />} text={"Users"} state={states.totalUsers}/>
                          </div>
                          <div className="w-[45%] lg:w-[22%] bg-gradient-to-r from-teal-400 to-teal-700 px-6 py-6 rounded-lg">
                            <DashboardStat svg={<ClockIcon className="h-9 w-9" />} text={"Pending"} state={states.totalPendingProducts}/>
                          </div>
                          <div className="w-[45%] lg:w-[22%] bg-gradient-to-r from-green-400 to-green-700 px-6 py-6 rounded-lg">
                            <DashboardStat svg={<InboxStackIcon className="h-9 w-9" />} text={"Products"} state={states.totalProducts}/>
                          </div>
                          <div className="w-[45%] lg:w-[22%] bg-gradient-to-r from-gray-400 to-gray-700 px-6 py-6 rounded-lg">
                            <DashboardStat svg={<BuildingStorefrontIcon className="h-9 w-9" />} text={"Stores"} state={states.totalStores}/>
                          </div>
                        </div>
                        <div className="w-[100%] lg:w-[100%] mt-6 lg:flex justify-between">
                          <div className="lg:w-[65%]">
                            <Card className="bg-gray-100 h-80 text-black">
                              <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                              >
                              </CardHeader>
                              <CardBody className="px-2">
                                <Chart {...firstGraphData} />
                              </CardBody>
                            </Card>
                          </div>
                          <div className="lg:w-[30%] mt-4 mb-32 lg:mt-0">
                            <Card className="bg-gray-100 h-80">
                            <CardHeader
                              floated={false}
                              shadow={false}
                              color="transparent"
                              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                            >
                              <span className="text-black font-semibold pl-2">Poducts by categories</span>
                            </CardHeader>
                            <CardBody className="mt-4 grid place-items-center px-2">
                              <Chart {...secondGraphData} />
                            </CardBody>
                            </Card>
                          </div>
                        </div>
                        <div className="flex mt-[-60px] gap-6 lg:gap-0 flex-col lg:flex-row lg:justify-between mb-32 lg:mb-10">
                          <div className="bg-gray-100 px-4 py-2 w-[100%] lg:w-[38%]">
                            <h1 className="text-2xl font-semibold">Recently joined users</h1>
                            <br></br>
                            {
                              latestJoinedUsers && latestJoinedUsers.length ? 
                                latestJoinedUsers.map((user) =>{
                                  return <p className="text-lg">● <Link className="text-blue-400 font-semibold" to={`/user/userData/${user.id}`}>{user.fullName}</Link> Joined the app {moment(user.created_at).fromNow()}</p>
                                })
                              :null
                            }
                          </div>
                          <div className="bg-gray-100 px-4 py-2 w-[100%] lg:w-[60%]">
                            <h1 className="text-2xl font-semibold">Recently Posted Products</h1>
                            <br></br>
                            {
                              recentlyPostedProducts && recentlyPostedProducts.length ? 
                              recentlyPostedProducts.map((product) =>{
                                  return <p className="text-lg">● <Link className="text-blue-400 font-semibold" to={`/user/userData/${product.store.user.id}`}>{product.store.user.fullName}</Link> posted a prdoduct on <Link to={`/store/storeData/${product.store.id}`} className="text-blue-400 font-semibold">{product.store.storeName}</Link> store {moment(product.created_at).fromNow()}</p>
                                })
                              :null
                            }
                          </div>
                        </div>
                      </div>
        }
      </div>
    </div>
  )
}
