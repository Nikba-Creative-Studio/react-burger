import { Location } from "history";

// components: Ingredient
export type TLocationState = {
    from: Location;
    ingredientModal?: Location;
};


// components: IngredientDetails, BurgerConstructor
export type TIngredientData = {
    _id: string;
    uid?: string;
    id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    image: string;
    image_mobile: string;
    image_large: string;
    price: number;
    __v: number;
    key: string;
    counter: number;
}

// components: IngredientDetails
export type TIngredientId = {
    id: string;
}

// components: Ingredient
export type TIngredientProps = {
    item: TIngredientData;
}

// components: IngredientDetails
export type TIngredients = {
    ingredients: TIngredientData[];
    isLoading: boolean;
}

// components: BurgerIngredients
export type TIngredientsType = {
    type: string;
}

// components: modal
export type TModalProps = {
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

// components: BurgerConstructor/Ingredient
export type TConstructorIngredientProps = {
    item: TIngredientData;
    type?: string;
    isLocked: boolean;
    id?: string;
    index?: any;
    //moveIngredient?: (dragIndex: any, hoverIndex: any) => void;
    moveIngredient?: any;   
}

// components: OrderDetails
export type TOrderDetailsProps = {
    order: {
        order: {
            number: number;
        }
    }
}

// components: Profile
export type TProfile = {
    password: string;
    email: string;
    name: string;
    token: string;
    editError: boolean;
    editData: {
        name: string;
        email: string;
        password: string;
    }
}

export type TAuth = {
    isLogin: boolean;
    resetPasswordSuccess: boolean;
    resetPasswordError: boolean;
    forgotPasswordSuccess: boolean;
    forgotPasswordError: boolean;
    loginError: boolean;
    registerError: boolean;
}

export type TIngrefientsTab = {
    type: string;
    scrollTo: any;
}