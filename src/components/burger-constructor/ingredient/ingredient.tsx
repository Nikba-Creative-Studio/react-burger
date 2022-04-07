import { useRef } from "react";
import { useAppDispatch } from '../../../services/hooks'
import { useDrag, useDrop, DragObjectFactory, DropTargetMonitor} from 'react-dnd';

import { 
    removeIngredient,
} from '../../../services/actions/burger-constructor';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { TIngredientData, TConstructorIngredientProps } from "../../../types/types";

export const Ingredient = ({ item, type, isLocked, id, index, moveIngredient }: TConstructorIngredientProps ) => {

    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement>(null);

    //Експериментальная функция для удаления ингредиентов (Проверка работаспособности totalPrice)
    const removeItem = (id: any): void => {
        dispatch(removeIngredient(id))
    }

    // Перемещение ингредиентов в конструкторе
    // Скомуниздил отсюдо https://react-dnd.github.io/react-dnd/examples/sortable/simple
    
    const [{ handlerId }, drop] = useDrop({
        accept: 'ingredient',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        hover: (item: DragObjectFactory<TIngredientData> & {index: number}, monitor: DropTargetMonitor) => {
            if(!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY: number = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset:any = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            setTimeout(() => moveIngredient(dragIndex, hoverIndex));
            item.index = hoverIndex;
        }
    })
    

    const [{ isDragging }, drag] = useDrag({
        type: 'ingredient',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    

    
    drag(drop(ref));

    return (
        item &&
        
            <div 
                className={!isDragging ? styles.ingredients_item : `${styles.ingredients_item} ${styles.active}` }
                ref={!isLocked ? ref : null}
                data-id={id}
                data-handler-id={handlerId}
            >
                {!isLocked && <DragIcon type="primary" />}
                <ConstructorElement
                    isLocked={isLocked}
                    //type={type}
                    text={item.name + (type === 'top' ? ' (верх)' : type === 'bottom' ? ' (низ)' : '')}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => removeItem(item.uid)}
                />
            </div>
        
    )
}