import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab, Box, Typography } from "@material-ui/core";
import { Navigate, useNavigate } from 'react-router-dom';
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {


  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState(0);

  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        padding={3}
        backgroundColor="white"
        width="100%"
        margin="40px 0 15px 0"
        borderRadius={8}
        border={1}
      >
        <Typography variant="h3">univinfo</Typography>
      </Box>
      <Box backgroundColor="white" width="100%" padding={4} borderRadius={8} border={1}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        {selectedTab === 0 && <Login />}
        {selectedTab === 1 && <Signup />}
      </Box>
    </Container>
  );
}

export default Homepage;

// import {
//   Box,
//   Container,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Text,
// } from "@chakra-ui/react";
// import { useEffect } from "react";
// //import { useHistory } from "react-router";
// import { Navigate, useNavigate } from 'react-router-dom';
// import Login from "../components/Authentication/Login";
// import Signup from "../components/Authentication/Signup";

// function Homepage() {
//   //const history = useHistory();
//   const navigate = useNavigate()
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userInfo"));
//   }, [navigate]);

//   return (
//     <Container maxW="xl" centerContent>
//       <Box
//         d="flex"
//         justifyContent="center"
//         p={3}
//         bg="white"
//         w="100%"
//         m="40px 0 15px 0"
//         borderRadius="lg"
//         borderWidth="1px"
//       >
//         <Text fontSize="4xl" fontFamily="Work sans">
//           univinfo
//         </Text>
//       </Box>
//       <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
//         <Tabs isFitted variant="soft-rounded">
//           <TabList mb="1em">
//             <Tab>Login</Tab>
//             <Tab>Sign Up</Tab>
//           </TabList>
//           <TabPanels>
//             <TabPanel>
//               <Login />
//             </TabPanel>
//             <TabPanel>
//               <Signup />
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Box>
//     </Container>
//   );
// }

// export default Homepage;
