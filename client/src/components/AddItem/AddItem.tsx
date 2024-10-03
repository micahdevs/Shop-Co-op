import { TextInput, ActionIcon, rem } from '@mantine/core';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { ItemType } from '../ItemList/ItemList';
import { v4 as uuidv4 } from 'uuid';

interface AddItemProps {
  onAddItem: (item: ItemType) => void;
}

export function AddItem({ onAddItem }: AddItemProps): JSX.Element {
  const [title, setTitle] = useState('');

  return (
    <TextInput
      value={title}
      onChange={e => setTitle(e.target.value)}
      mt={25}
      m="md"
      radius="xl"
      size="md"
      placeholder="Add items"
      rightSectionWidth={42}
      rightSection={
          <ActionIcon color='#fcc41a' 
          onClick={() => {
            const id = uuidv4();
            setTitle('');
            onAddItem({ id, title });
          }} 
          size={32} 
          radius="xl" 
          variant="filled"
          >
            <IconPlus style={{ width: rem(18), height: rem(18), color: '#252525' }} stroke={1.5}/>
          </ActionIcon>
    }
    />
  );
}