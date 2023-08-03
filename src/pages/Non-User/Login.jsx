import { Button, Card, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = async () => {
  
    try {
      
      const response = await axios.post('http://localhost:5001/login',{

      username,
      password,

      });
      
      console.log('Response from backend:', response.data);
      
      const userType = response.data.user_type_id;

      if(response.status === 200 ){
        console.log('User Type:', userType);
        if(userType === 1){
          navigate('/user');
        }else if(userType === 2 || userType === 3){
          navigate('/admin');
        }else if(userType === 0){
          navigate('/blocked');
        }else{
          alert('wrong user type');
        }

      }else{
        alert('Login failed');
      }


    } catch (error) {
      console.log(error);
      alert('An error occurred. Please try again later.');
    }

  };

  return (
    <Flex h={'100dvh'} justifyContent={'center'} bg={'black'}>
      <Card my={'auto'} justify={'center'} padding={'2.5vw'}>
        <Flex flexDirection={'column'}>
          <Text textAlign={'center'} fontSize={'2xl'}>
            Login
          </Text>

          <FormControl padding={'1vw'} isRequired>
            <FormLabel padding={'0.5vh'}>Username</FormLabel>
            <Input
              placeholder='Username'
              marginBottom={'1vw'}
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <FormLabel>Password</FormLabel>
            <Input
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Flex justifyContent={'center'} mt={'4'} flexDirection={'column'}>
              <Button colorScheme='teal' size='md' onClick={handleButtonClick}>
                login
              </Button>

              {errorMessage && <Text fontSize={'1xl'} color={'red'} textAlign={'center'} mt={2}>{errorMessage}</Text>}

              <Text fontSize={'1xl'} textAlign={'center'} mt={2}>
                Don't have an account?{' '}
                <Text color={'teal.500'} textDecoration={'underline'} as={Link} to='/register'>
                  {' '}
                  Register now{' '}
                </Text>
              </Text>
            </Flex>
          </FormControl>
        </Flex>
      </Card>
    </Flex>
  );
}

export default Login;