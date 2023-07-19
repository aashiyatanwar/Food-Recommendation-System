const getCurUser = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/currentUser`);
    return res;
  } catch (error) {
    return null;
  }
};

const currId = getCurUser();
//console.log("curr" , currId)
module.exports = currId;
