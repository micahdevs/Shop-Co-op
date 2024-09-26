import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem, List } from '@mantine/core';
import classes from './InputWithButton.module.css';
import { useState } from 'react';
import { IconPlus, IconCircleCheck } from '@tabler/icons-react';

export function InputWithButton(props: TextInputProps) {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem('');
  };

  const handleDeleteItem = (index: number) => {
    setItems(
      // Underscore first argument indicates it is not needed
      items.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const theme = useMantineTheme();

  return (
    <>
    <TextInput
    value={newItem}
    onChange={handleInputChange}
    className={classes.input}
    mt={25}
    m="md"
    radius="xl"
    size="md"
    placeholder="Add items"
    rightSectionWidth={42}
    rightSection={
        <ActionIcon onClick={handleAddItem} size={32} radius="xl" color={theme.primaryColor} variant="filled">
        <IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
    }
    {...props}
    />
    
    <List spacing="sm" size="md" center>
        {items.map((item, index) => (
          <List.Item key={index}>
            {item}
            <ActionIcon onClick={() => handleDeleteItem(index)} color="teal" size={24} radius="xl">
              <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </List.Item>
        ))}
      </List>
    </>
    
  );
}