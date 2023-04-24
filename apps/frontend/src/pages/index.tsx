import {Button, Center, Image, Text, VStack} from '@chakra-ui/react';
import React from 'react';

import misskey from '@/assets/misskey.png';

export default function index() {
  return (
    <Center w="100%" h="100vh">
      <VStack>
        <Text
          fontSize="8xl"
          fontFamily="OTADESIGN Rounded"
          bgGradient="linear(to-br, misskey.lighten, misskey.darken)"
          bgClip="text"
          textShadow="md"
        >
					Misskey Tools
        </Text>
        <Text fontSize="2xl">プロ仕様のツールキット。</Text>
        <Button size="lg" variant="outline" borderColor="misskey.normal" textColor="misskey.normal">
          <Image src={misskey}/>
					Misskeyでログイン
        </Button>
      </VStack>
    </Center>
  );
}
