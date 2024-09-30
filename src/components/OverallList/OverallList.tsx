import { useState } from 'react';
import { AddItem } from '../AddItem/AddItem';
import { ItemList, ItemType } from '../ItemList/ItemList';

export function OverallList() {
    const [items, setItems] = useState<ItemType[]>([])

    function handleAddItem({ id, title }: ItemType) {
        setItems([
            ...items, 
            {id, title}
        ]);
    }

    function handleUpdateItem(nextItem: ItemType) {
        setItems(items.map(i => {
            if (i.id === nextItem.id) {
                return nextItem;
            } 
            
            return i;

        }));
    }

    function handleDeleteItem(itemId: string) {
        setItems(
            items.filter(i => i.id !== itemId)
        );
    }

    return (
        <>
            <AddItem
                onAddItem={handleAddItem} 
            />
            <ItemList
                items={items}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
            />
        </>
    );
}