const initialState = {
  dataPayment: {},
};

const paymentReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'DATA_PAYMENT':
      const data = action.payload.data;
      return {
        dataPayment: {
          ...prevState.dataPayment,
          ...data,
        },
      };
    default:
      return prevState;
  }
};

export default paymentReducer;
