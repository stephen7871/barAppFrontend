import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, InputAdornment, InputLabel, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
//import { useHistory } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //const history = useHistory();
  const navigate = useNavigate()
  const submitHandler = async () => {
    setLoading(true);

    if (!username || !password) {
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://127.0.0.1:5001/api/user/login",
        { username, password },
        config
      );

      // Handle the response as needed, e.g., set user authentication status and redirect.
      // history.push("/dashboard"); // Uncomment to redirect to a dashboard page upon successful login
    } catch (error) {
      // Handle login error, show an error message, etc.
    }
  };

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Button onClick={handleClickShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button variant="contained" color="primary" onClick={submitHandler}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </div>
  );
};

export default Login;

// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";
// import { useState } from "react";
// import axios from "axios";
// import { useToast } from "@chakra-ui/react";
// //import { useHistory } from "react-router-dom";
// import { Navigate, useNavigate } from 'react-router-dom';
// const Login = () => {
//   const [show, setShow] = useState(false);
//   const handleClick = () => setShow(!show);
//   const toast = useToast();
//   const [username, setUsername] = useState();
//   const [password, setPassword] = useState();
//   const [loading, setLoading] = useState(false);

//   //const history = useHistory();
//   const navigate = useNavigate()

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!username || !password) {
//       toast({
//         title: "Please Fill all the Feilds",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }

//     // console.log(email, password);
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "http://127.0.0.1:5001/api/user/login",
//         { username, password },
//         config
//       );

//       // Send data to the backend via POST
//   //   const data = fetch('http://127.0.0.1:5001/api/user/login', {  // Enter your IP address here

//   //   method: 'POST', 
//   //   mode: 'cors', 
//   //   body: JSON.stringify({ username, password }),
//   //   config 

//   // })
//   // console.log(JSON.stringify(data?.username));
  


//       // console.log(JSON.stringify(data));
//       toast({
//         title: "Login Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//       navigate("/Home/blog");
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: error.response.data.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//     }
//   };

//   return (
//     <VStack spacing="10px">
//       <FormControl id="username" isRequired>
//         <FormLabel>username</FormLabel>
//         <Input
//           value={username}
//           // type="email"
//           placeholder="username"
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type={show ? "text" : "password"}
//             placeholder="Enter password"
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Login
//       </Button>
//       <Button
//         variant="solid"
//         colorScheme="red"
//         width="100%"
//         onClick={() => {
//           setUsername("guest@example.com");
//           setPassword("123456");
//         }}
//       >
//         Get Guest User Credentials
//       </Button>
//     </VStack>
//   );
// };

// export default Login;