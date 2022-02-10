const ingredientsInitialState = {
    // Первоначальное состояние ингредиентов бургера
    ingredients: [], // Список ингредиентов
    ingredient: null, // Выбранный ингредиент
    constructorIngredients: [], // Список ингредиентов в конструкторе
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
    
    // Редюсеры для изменения состояния ингредиентов бургера
    switch(action.type) {

        // Загрузка ингредиентов бургера
        case 'BURGER/FETCH_INGREDIENTS_SUCCESS': 
            return {
                ...state,
                ingredients: action.payload.ingredients
            }
        
        // Выбор ингредиента
        case 'BURGER/SELECT_INGREDIENT':
            return {
                ...state,
                ingredient: action.payload.ingredient
            }
            
            // Отмена выбора ингредиента
            case 'BURGER/DESELECT_INGREDIENT':
                return {
                    ...state,
                    ingredient: null
                }
        
        default: 
            return state;
        
    }
}