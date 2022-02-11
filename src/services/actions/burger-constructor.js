export const SET_INGREDIENTS = 'CONSTRUCTOR/SET_INGREDIENTS';
export const SET_BUN_TYPE = 'CONSTRUCTOR/SET_BUN_TYPE';
export const REMOVE_INGREDIENT = 'CONSTRUCTOR/REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'CONSTRUCTOR/MOVE_INGREDIENT';
export const CLEAN_CONSTRUCTOR = 'CONSTRUCTOR/CLEAN_CONSTRUCTOR';

export function setIngredients(item, uid) {
    return function(dispatch) {
        dispatch({
            type: SET_INGREDIENTS,
            item: {...item, uid: uid}
        })
    }
}

export function setBuns(item, uid) {
    return function(dispatch) {
        dispatch({
            type: SET_BUN_TYPE,
            item: {...item, uid: uid}
        })
    }
}

export function removeIngredient(uid) {
    return function(dispatch) {
        dispatch({
            type: REMOVE_INGREDIENT,
            uid: uid
        })
    }
}

export function moveIngredients(dragIndex, hoverIndex) {
    return function(dispatch) {
        dispatch({
            type: MOVE_INGREDIENT,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        })
    }
}

export function cleanConstructor() {
    return function(dispatch) {
        dispatch({
            type: CLEAN_CONSTRUCTOR
        })
    }
}