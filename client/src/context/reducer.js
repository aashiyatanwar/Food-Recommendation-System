export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_DATA: "SET_ALL_DATA",
  SET_DATA: "SET_DATA",
  SET_POST : "SET_POST"
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_DATA:
      return {
        ...state,
        data: action.data,
      };

    case actionType.SET_ALL_DATA:
      return {
        ...state,
        allData: action.allData,
      };

    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };

    default:
      return state;
  }
};

export default reducer;
