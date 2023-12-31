import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, InputAdornment, InputLabel, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
//import { useHistory } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const navigate = useNavigate()
  //const history = useHistory();

  const submitHandler = async () => {
    setPicLoading(true);

    if (!name || !username || !password || !confirmPassword) {
      setPicLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://127.0.0.1:5001/api/user",
        {
          name,
          username,
          password,
          pic,
        },
        config
      );

      // Handle the response as needed, e.g., set user authentication status and redirect.
      // history.push("/dashboard"); // Uncomment to redirect to a dashboard page upon successful signup
    } catch (error) {
      // Handle signup error, show an error message, etc.
    }
  };

  const postDetails = (selectedPic) => {
    setPicLoading(true);

    if (selectedPic === undefined) {
      return;
    }

    if (selectedPic.type === "image/jpeg" || selectedPic.type === "image/png") {
      const data = new FormData();
      data.append("file", selectedPic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((response) => {
          setPic(response.url.toString());
          setPicLoading(false);
        })
        .catch((error) => {
          setPicLoading(false);
        });
    }
  };

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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

      <FormControl>
        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <Button onClick={handleClickShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="pic">Upload your Picture</InputLabel>
        <Input
          id="pic"
          type="file"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button variant="contained" color="primary" onClick={submitHandler}>
        {picLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
      </Button>
    </div>
  );
};

export default Signup;

// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useState } from "react";
// //import { useHistory } from "react-router";
// import { Navigate, useNavigate } from 'react-router-dom';
// const Signup = () => {
//   const [show, setShow] = useState(false);
//   const handleClick = () => setShow(!show);
//   const toast = useToast();
//   //const history = useHistory();
//     const navigate = useNavigate()
//   const [name, setName] = useState();
//   const [username, setUsername] = useState();
//   const [confirmpassword, setConfirmpassword] = useState();
//   const [password, setPassword] = useState();
//   const [pic, setPic] = useState();
//   const [picLoading, setPicLoading] = useState(false);

//   const submitHandler = async () => {
//     setPicLoading(true);
//     if (!name || !username || !password || !confirmpassword) {
//       toast({
//         title: "Please Fill all the Feilds",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setPicLoading(false);
//       return;
//     }
//     if (password !== confirmpassword) {
//       toast({
//         title: "Passwords Do Not Match",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }
//     console.log(name, username, password, pic);
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         "http://127.0.0.1:5001/api/user",
//         {
//           name,
//           username,
//           password,
//           pic,
//         },
//         config
//       );
//       console.log(data);
//       toast({
//         title: "Registration Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setPicLoading(false);
//       navigate("/Home");
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: error.response.data.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setPicLoading(false);
//     }
//   };

//   const postDetails = (pics) => {
//     setPicLoading(true);
//     if (pics === undefined) {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }
//     console.log(pics);
//     if (pics.type === "image/jpeg" || pics.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "chat-app");
//       data.append("cloud_name", "piyushproj");
//       fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPic(data.url.toString());
//           console.log(data.url.toString());
//           setPicLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           setPicLoading(false);
//         });
//     } else {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setPicLoading(false);
//       return;
//     }
//   };

//   return (
//     <VStack spacing="5px">
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter Your Name"
//           onChange={(e) => setName(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="username" isRequired>
//         <FormLabel>username</FormLabel>
//         <Input
//           type="username"
//           placeholder="username"
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Confirm Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Confirm password"
//             onChange={(e) => setConfirmpassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <FormControl id="pic">
//         <FormLabel>Upload your Picture</FormLabel>
//         <Input
//           type="file"
//           p={1.5}
//           accept="image/*"
//           onChange={(e) => postDetails(e.target.files[0])}
//         />
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={picLoading}
//       >
//         Sign Up
//       </Button>
//     </VStack>
//   );
// };

// export default Signup;
