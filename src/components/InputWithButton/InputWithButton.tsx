import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem, Center } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import classes from './InputWithButton.module.css';

export function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <Center>
        <TextInput
        className={classes.input}
        mt={25}
        m="md"
        radius="xl"
        size="md"
        placeholder="Add items"
        rightSectionWidth={42}
        rightSection={
            <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
            <IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
        }
        {...props}
        />
    </Center>
  );
}