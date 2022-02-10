const constructorInitialState = {
    // Первоначальное состояние конструктора бургера
    ingredients: [], // Список ингредиентов
    buns: null, // Список булочек
}

export const constructorReducer = (state = constructorInitialState, action) => {
    // Редюсеры для конструыктора бургера
    switch (action.type) {
        case 'CONSTRUCTOR/SET_INGREDIENTS': 
            return {
                ...state,
                ingredients: [...state.ingredients, action.item],
            }
        case 'CONSTRUCTOR/SET_BUN_TYPE':
            return {
                ...state,
                buns: action.item,
            }

        case 'CONSTRUCTOR/REMOVE_INGREDIENT':
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item => item.uid !== action.uid)
            }


        default: 
            return state;
        
    }
}