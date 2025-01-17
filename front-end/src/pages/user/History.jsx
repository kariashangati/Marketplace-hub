import { useEffect, useState } from "react";
import { UserSideBar } from "../../layouts/UserSideBar";
import {TrashIcon } from "@heroicons/react/24/outline";
import { deleteSearchesBy, getSearchesBy } from "../../services/searchServices";
import moment from "moment";
import { SearchSkeleton } from "../../components/skeletons/SearchSkeleton";


export const History = () => {
  const [searches , setSearches] = useState([]);
  const [loading , setLoading] = useState(true);

  
  
  const getSearches = async () => {
      setLoading(true)
      try {
        const response = await getSearchesBy(localStorage.getItem("token"));
        setLoading(false)
        if(response.data.searches){
          setSearches(response.data.searches)
        }
      } catch (error) {
        setLoading(false)
      }
  };
  const deleteSearches = async (id) => {
      setSearches([])
      try {
        const response = await deleteSearchesBy(
          localStorage.getItem("token"),
          id
        );
        await getSearches()  
        
      } catch (error) {
        if (error.response) {
          setNotification({
            type: "error",
            message: error.response.data.message,
          });
        } else {
          setNotification({ type: "error", message: "Try again later" });
        }
      }
    };


  useEffect(() => {
      getSearches();
    }, []);

  return (
    <div>
      <div>
        <UserSideBar />
      </div>

      <div className="lg:ml-[21%] px-2 mt-8">
        <div>
            <h1 className="text-3xl font-semibold">Your history</h1>
            <div className="flex flex-col lg:flex-wrap lg:flex-row gap-[1%]">
              {
                !loading &&
                <>
                  {
                    searches && searches.length ? 
                      searches.map((search)=>{
                        return(
                          <div className="mt-6  gap-4 bg-dark w-[100%] lg:w-[24%] mb-2 px-2 h-32 py-1">
                            <div className=" flex justify-between items-center mt-6">
                              <div><h2 key={search.id} className="text-white text-xl">{search.query}</h2></div>
                              <div><TrashIcon className=" h-8 text-red-600 cursor-pointer hover:text-red-800 duration-200" onClick={()=>deleteSearches(search.id)}/></div>
                            </div>
                            <div className="w[100%] flex justify-end mt-9">
                              <h6 className="text-sm text-gray-500 font-semibold">{moment(search.created_at).format("DD-MM-YYYY")}</h6>
                            </div>
                          </div>
                        )
                      })
                      :<p className="mt-2 font-semibold">No history goes here</p>
                  }
                </>
              }
              {
                loading ?
                  <div className="flex flex-row justify-between w-[100%] mt-6">
                      <SearchSkeleton />
                      <SearchSkeleton />
                      <SearchSkeleton />
                      <SearchSkeleton />
                    </div>
                
                :null
              }
            </div>
        </div>
      </div>
    </div>
  );
};
