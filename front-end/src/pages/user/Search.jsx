import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { UserSideBar } from "../../layouts/UserSideBar";
import { getTopUsersSer } from "../../services/userServices";
import { SingleUserData } from "../../components/App/SingleUserData";
import { SingleUserDataSkeleton } from "../../components/skeletons/SingleUserDataSkeleton";
import { getSearchData, postSearch } from "../../services/searchServices";
import { SearchedUser } from "../../components/App/SearchedUser";
import { Product } from "../../components/App/Product";
import { ProductSkeleton } from "../../components/skeletons/ProductSkeleton";

export const Search = () => {

    const [loading,setLoading] = useState(true);
    const [loadingSearch,setLoadingSearch] = useState(false);
    const [users,setUsers] = useState([]);
    const [products,setProducts] = useState([]);
    const [searchedUsers,setSearchedUsers] = useState([]);
    const [query,setQuery] = useState('');
    const searched = useRef(false);

    const getTopUsers = async () =>{
        const response = await getTopUsersSer(localStorage.getItem("token"));
        setLoading(false)
        console.log(response);
        
        if(response.status === 200){
            setUsers(response.data.topUsers);
        }
    }

    const search = async (e) =>{
        e.preventDefault()
        setLoadingSearch(true);        
        searched.current = true;
        const response = await getSearchData(localStorage.getItem("token"),query);
        setLoadingSearch(false);
        
        if(response.status === 200){
            const formData = new FormData();
            formData.append("query",query);
            setSearchedUsers(response.data.usersBasedOnQuery);
            setProducts(response.data.productsBasedOnQuery);
            await postSearch(localStorage.getItem("token"),formData);
        }
    }

    useEffect(() =>{
        getTopUsers();
    },[])   
  return (
    <div>
      <div>
        <UserSideBar />
      </div>

      <div className="lg:ml-[21%] px-2 mt-8">
        <div>
            <h1 className="text-3xl font-semibold">Search for somthing</h1>
            <form className="flex gap-4 lg:w-[60%] w-[100%] mt-4" onSubmit={search}>
                <Input type={'text'} placholder={'Search for users,products'}
                value={query} onChange={(e) => setQuery(e.target.value)}/>
                <Button type={'submit'} text={'Search'} width={'30%'} loading={loadingSearch}/>
            </form>  
            {
                loading ? <>
                    <SingleUserDataSkeleton height={'16'}/>
                    <SingleUserDataSkeleton height={'16'}/>
                    <SingleUserDataSkeleton height={'16'}/>
                    <SingleUserDataSkeleton height={'16'}/>
                    <SingleUserDataSkeleton height={'16'}/>
                </>
                :null
            }
            {
                !loading && !searched.current ? <div className="mt-6">
                                <h1 className="text-xl font-semibold">Top users posting</h1>
                                <div className="flex gap-4 flex-wrap">
                                    {
                                        users && users.length ?
                                            users.map((user) => {
                                                return <SingleUserData userData={user} />
                                            })
                                        :null
                                    }
                                </div>
                            </div>
                :null
            }
            {
                loadingSearch ? <div className="mt-8 flex flex-col">
                    <div>
                        <SingleUserDataSkeleton height={'10'}/>
                        <SingleUserDataSkeleton height={'10'}/>
                        <SingleUserDataSkeleton height={'10'}/>
                        <SingleUserDataSkeleton height={'10'}/>
                    </div>
                    <div className="mt-2 flex flex-col gap-2">
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                    </div>
                </div>:null
            }
            {
                !loadingSearch && searched.current ?<div className="mt-6">
                                <h1 className="text-xl font-semibold">Users, Products based on your search</h1>
                                <div className="flex gap-4 flex-wrap">
                                    {
                                        searchedUsers && searchedUsers.length ?
                                            searchedUsers.map((user) => {
                                                return <SearchedUser userData={user} />
                                            })
                                        :null
                                    }
                                </div>
                            </div>
                :null
            }
            {
                !loadingSearch && searched.current ?<div className="mt-6">
                                <div className="flex gap-4 flex-wrap">
                                    {
                                        products && products.length ?
                                            products.map((product) => {
                                                return <Product productData={product} viewUser={false}/>
                                            })
                                        :null
                                    }
                                </div>
                            </div>
                :null
            }
        </div>
      </div>
    </div>
  );
};
