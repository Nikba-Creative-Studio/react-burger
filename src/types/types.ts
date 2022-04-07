import { Location } from "history";
import {rootReducer} from '../services/reducers';

export type RootState = ReturnType<typeof rootReducer>

// components: Ingredient
export type TLocationState = {
    readonly from: Location;
    readonly ingredientModal?: Location;
    readonly ordersModal?: Location;
};


// components: IngredientDetails, BurgerConstructor
export type TIngredientData = {
    readonly _id: string;
    readonly uid?: string;
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly price: number;
    readonly __v: number;
    readonly key: string;
    readonly counter: number;
}

export type TIngredientDataList = {
    readonly key: string;
    readonly ingredients: TIngredientData[];
}

// components: IngredientDetails
export type TIngredientId = {
    readonly id: string;
}

// components: Ingredient
export type TIngredientProps = {
    readonly item: TIngredientData;
}

// components: IngredientDetails
export type TIngredients = {
    readonly ingredients: TIngredientData[];
    readonly isLoading: boolean;
}

// components: BurgerIngredients
export type TIngredientsType = {
    readonly type: string;
}

// components: modal
export type TModalProps = {
    readonly onClose: () => void;
    readonly title?: string;
    readonly children: React.ReactNode;
}

// components: BurgerConstructor/Ingredient
export type TConstructorIngredientProps = {
    readonly item: TIngredientData | null;
    readonly type?: string;
    readonly isLocked: boolean;
    readonly id?: string;
    readonly index?: any;
    //moveIngredient?: (dragIndex: any, hoverIndex: any) => void;
    readonly moveIngredient?: any;   
}

// components: OrderDetails
export type TOrderDetailsProps = {
    readonly order: {
        readonly order: {
            readonly number: number;
        }
    }
}

// components: Profile
export type TProfile = {
    readonly password: string;
    readonly email: string;
    readonly name: string;
    readonly token: string;
    readonly editError: boolean;
    readonly editData: {
        readonly name: string;
        readonly email: string;
        readonly password: string;
    }
}

export type TAuth = {
    readonly isLogin: boolean;
    readonly resetPasswordSuccess: boolean;
    readonly resetPasswordError: boolean;
    readonly forgotPasswordSuccess: boolean;
    readonly forgotPasswordError: boolean;
    readonly loginError: boolean;
    readonly registerError: boolean;
}

export type TIngrefientsTab = {
    readonly type: string;
    readonly scrollTo: any;
}