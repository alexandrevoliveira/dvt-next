import { Icon, Stack, Text } from '@chakra-ui/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaGithub } from 'react-icons/fa'

export function SignInButton() {
  const { data: session } = useSession();
  const router = useRouter()


  return session ? (
    <Stack
      as="button"
      bg="gray.700"
      mr="2"
      px={6}
      py={2}
      borderRadius={30}
      direction="row"
      align="center"
      spacing={[2,4]}
      aria-label="signIn"
      onClick={async () => {
        signOut()
        await router.push("/")
      }}
    >
      <Icon as={FaGithub} fontSize={[22, 24]} color="green.500"/>
      <Text lineHeight={1} fontSize={[14, 16]} fontWeight="bold" color="gray.50">
        {session.user.name}
      </Text>
    </Stack>
  ) : (
    <Stack
      as="button"
      bg="gray.700"
      mr="2"
      px={6}
      py={2}
      borderRadius={30}
      direction="row"
      align="center"
      spacing={[2,4]}
      aria-label="signIn"
      onClick={() => signIn('github')}
    >
      <Icon as={FaGithub} fontSize={[22, 24]} color="yellow.500"/>
      <Text lineHeight={1} fontSize={[14, 16]} fontWeight="bold" color="gray.50">
        Sign in with Github
      </Text>
    </Stack>
  )
}