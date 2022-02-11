import update from 'immutability-helper';

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
        
        case 'CONSTRUCTOR/MOVE_INGREDIENT': {
            
            if(action.dragIndex === undefined) return state;

            const ingredient = state.ingredients[action.dragIndex];

            return {
                ...state,
                ingredients: update(state.ingredients, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, ingredient],
                    ],
                }),
            }
        }



        default: 
            return state;
        
    }
}