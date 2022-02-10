const orderDetailsInitialState = {
    order: {},
    orderDetailsModal: false
}

export const orderDetailsReducer = (state = orderDetailsInitialState, action) => {
    switch (action.type) {
        case 'ORDER/POST_ORDER_SUCCESS':
            return {
                ...state,
                order: action.payload.data,
                orderDetailsModal: true
            }
        case 'ORDER/POST_ORDER_FAILURE':
            return {
                ...state,
                order: action.payload.error
            }
        case 'ORDER/HIDE_MODAL':
            return {
                ...state,
                orderDetailsModal: false
            }
        default:
            return state;
    }
}