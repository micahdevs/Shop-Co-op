import { useState } from 'react';

export interface ItemType {
    id: string;
    title: string;
}

export interface ItemListProps {
    items: ItemType[];
    onUpdate: (item: ItemType) => void;
    onDelete: (id: string) => void;
}

export function ItemList({ items, onUpdate, onDelete }: ItemListProps): JSX.Element {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <Item
                        item={item}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                </li>
            ))}
        </ul>
    )
}

export interface ItemProps {
    item: ItemType;
    onUpdate: (item: ItemType) => void;
    onDelete: (id: string) => void;
}

function Item({ item, onUpdate, onDelete }: ItemProps): JSX.Element {
    const [isEditing, setIsEditing] = useState(false);
    let itemContent;
    if (isEditing) {
        itemContent = (
            <>
                <input
                    value={item.title}
                    onChange={e => {
                        onUpdate({
                            ...item,
                            title: e.target.value
                        });
                    }}
                />
                <button type='button' onClick={() => setIsEditing(false)}>
                    Save
                </button>
            </>
        );
    } else {
        itemContent = (
            <>
                {item.title}
                <button 
                    type='button' 
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
            </>
        );
    }

    return (
        <label>
            {itemContent}
            <button type='button' onClick={() => onDelete(item.id)}>
                Delete
            </button>
        </label>
    )
}