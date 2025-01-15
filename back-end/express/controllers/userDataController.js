
const deleteUserDeletedData = async (request,response) =>{
    console.log("it works! the user deleted "+request.body.userDeleted);
    return response.status(200).json({
        'message' : "user will his messages be deleted"
    })
}


module.exports = {deleteUserDeletedData};