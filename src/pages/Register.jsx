import React from 'react';
import {
  Box,
  Card,
  Flex,
  Text,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
  Link,
} from '@chakra-ui/react';

function Register() {
  const handleRegister = () => {
    alert('clicked');
  };

  return (
    <Flex h={'100dvh'} justify={'center'} backgroundColor={'teal.400'}>
      <Flex mr={'auto'}>
        <Stack my={'auto'} mx={'5vw'} pb={'10vw'}>
          <Text fontSize={'6xl'} textAlign={'left'}>
            Create an account
          </Text>
          <Text fontSize={'3xl'} textAlign={'left'}>
            &nbsp;&nbsp;&nbsp;Make your own account for private contacting!{' '}
          </Text>
        </Stack>
      </Flex>

      <Flex minW={'60vw'} maxW={'60vw'} justifyContent={'center'}>
        <Stack w={'60%'} >
          <Text fontSize={'6xl'} mb={'5vh'} mt={'5vh'} >  
            Register
          </Text>

          <Card>
            <FormControl padding={'5%'} isRequired>
              <FormLabel fontSize={'2xl'}>Username</FormLabel>
              <Input type="text" placeholder="Username" />

              <FormLabel fontSize={'2xl'}>Password</FormLabel>
              <Input type="password" placeholder="Password" />

              <FormLabel fontSize={'2xl'}>Confirm password</FormLabel>
              <Input type="password" placeholder="Confirm Password" />

              <FormLabel fontSize={'2xl'}>Phone number</FormLabel>
              <Input type="text" placeholder="Phone number" />

              <Flex alignItems="baseline">
                <FormLabel fontSize={'2xl'}>Line ID</FormLabel>
                <Text color="gray.500" fontSize="xl">
                  (optional)
                </Text>
              </Flex>
              <Input type="text" placeholder="Line ID" />

              <ButtonGroup>

                <Button mt={4} colorScheme="teal" size="lg" onClick={handleRegister}>
                  Submit
                </Button>
                
                <Link href="/Index">
                  <Button mt={4} colorScheme="gray" size="lg" >
                    <Text color={'gray'}> Cancle </Text>
                  </Button>
                </Link>

              </ButtonGroup>
              
              <Text mt={'4'} textAlign={'center'}> already have an account?{' '}
              <Link textDecoration="underline" href="/login" color={"teal.500"} >Log in</Link> 
              </Text>

            </FormControl>
          </Card>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Register;
