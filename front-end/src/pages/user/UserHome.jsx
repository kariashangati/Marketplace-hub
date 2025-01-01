
export const UserHome = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h1 className="text-3xl">Welcome user {userData.fullName}</h1>
    </div>
  )
}
