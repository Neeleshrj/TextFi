export default (state = [], action) => {
    // console.log("inside reducer");
    // console.log(action.payload);
    switch (action.type) {
        case 'GET_LIST':
            return action.payload;
        default:
            return state;
    }
};
