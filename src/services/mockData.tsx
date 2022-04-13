import { TIngredientData } from '../types/types';
import { IPostData } from '../types/order-details';
import { IWsOrders } from '../types/feed';

export const mockBun: TIngredientData = {
    _id: "60d3b41abdacab0026a733c6",
    uid: "abc",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,

}

export const mockIngredient: TIngredientData = {
    _id: "60d3b41abdacab0026a733c8",
    uid: "b338517-be7c-61c2-718f-534a63773a5c",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0
}

export const mockIngredientSouce: TIngredientData = {
    _id: "60d3b41abdacab0026a733cf",
    uid: "b338517-61c2-be7c-718f-534a63773a5c",
    name: "Соус с шипами Антарианского плоскоходца",
    type: "sauce",
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: "https://code.s3.yandex.net/react/code/sauce-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
    __v: 0
}

export const mockPostOrder: IPostData[] = [{
    name: "Краторный spicy традиционный-галактический бургер",
    order: {
        number: 10101,
    },
    success: false
}]

export const mockFeedData: IWsOrders[] = [{
    _id: '62552b821a3b2c001bcff46b',
    ingredients: [
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733c6'
    ],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2022-04-12T07:34:26.768Z',
    updatedAt: '2022-04-12T07:34:26.960Z',
    number: 13467
}]



