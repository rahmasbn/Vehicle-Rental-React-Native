const initialState = {
  userData: {
    token: null,
    photo: '',
    role: 0,
    id: 0,
  },

  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};
const authReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN_PENDING':
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    case 'AUTH_LOGIN_FULFILLED':
      const data = action.payload.data;
      const userData = {
        ...prevState.userData,
        token: data.result.token,
        photo: data.result.image,
        role: data.result.roles,
        id: data.result.id,
      };
      console.log('userdata', userData);
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        userData,
      };

    case 'AUTH_LOGIN_REJECT':
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };

    case 'USER_PHOTO':
      const newPhoto = action.payload;
      return {
        ...prevState,
        userData: {
          ...prevState.userData,
          photo: newPhoto,
        },
      };

    default:
      return prevState;
  }
};

export default authReducer;
