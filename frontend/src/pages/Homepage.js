import React from 'react'
import { Container ,Box,Text,TabList,Tabs,Tab,TabPanel,TabPanels} from '@chakra-ui/react'
import Login from "../Components/Authentication/Login"
import Signup from "../Components/Authentication/Signup"
const Homepage = () => {
  return (
  
      <Container maxW="xl" centerContent>
        <Box display='flex'
        justifyContent="center"
        p='3'
        bg="white"
        width="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
          <Text fontSize='4xl' fontFamily='sans-serif' color='black'>Chat_ME</Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign_up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
   <Login/>
    </TabPanel>
    <TabPanel>
   <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
      </Container>

  )
}

export default Homepage