import { Welcome } from '../components/Welcome/Welcome';
import { InputWithButton } from '@/components/InputWithButton/InputWithButton';
import { Flex } from '@mantine/core';

export function HomePage() {
  return (
    <>
      <Welcome />

      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
        >
        <InputWithButton/>
      </Flex>

    </>
  );
}
