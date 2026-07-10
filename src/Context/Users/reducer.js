const reducer = (state, { type, payload }) => {
  switch (type) {
    case "Start":
      return { ...state, loading: true };
    case "GET":
      return { ...state, loading: false, List: payload, type: "GET" };
    case "PUT":
      return { ...state, loading: false, List: payload, type: "PUT" };
    case "ERROR":
      return { ...state, loading: false, error: payload, type: "ERROR" };
    default:
      return state;
  }
};

export default reducer