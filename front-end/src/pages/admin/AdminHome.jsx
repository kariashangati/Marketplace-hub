
export const AdminHome = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h1 className="text-3xl">Welcome admin {userData.fullName}</h1>
    </div>
  )
}
