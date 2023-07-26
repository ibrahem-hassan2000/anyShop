import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/shopSlice";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handelGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            hh: "Gfgfg,",
            image: user.photoURL,
            email: user.email,
            token: user.accessToken,
          })
        );
        console.log(user);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelGoogleLogOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        toast.success("logOut");
        dispatch(removeUser());
      })
      .catch((error) => console.log(error));
  };

  const handelEmail = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password, displayName)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.displayName = displayName;
        console.log(user);
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            hh: "Gfgfg,",
            image: user.photoURL,
            email: user.email,
            token: user.accessToken,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterror(errorCode);

        // ..
      });
  };

  return (
    <div className="max-w-[400px] w-[400px] mx-auto my-16">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Mantine, with
        </Text>

        <Group grow mb="md" mt="md" className="justify-center">
          <div
            className="flex items-center flex-1 sm:min-w-[166px] min-w-[100%] p-3 gap-1  justify-center rounded-[8px]  shadow-md text-[14px] cursor-pointer"
            onClick={handelGoogleLogin}
          >
            {" "}
            <FcGoogle radius="xl" /> Sign in With Google
          </div>
          <div className="flex items-center flex-1 sm:min-w-[166px] min-w-[100%] p-3 gap-1  justify-center rounded-[8px]  shadow-md text-[14px] cursor-pointer">
            {" "}
            <FaTwitter radius="xl" color="#007af8" /> Sign in With Twitter
          </div>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form>
          {error && (
            <h3 className="text-center text-[14px] text-red-600 my-1 font-bold">
              {error}
            </h3>
          )}
          <Stack>
            <TextInput
              required
              label="Full Name"
              placeholder="Your Name"
              radius="md"
              onChange={(e) => {
                setdisplayName(e.target.value);
              }}
            />
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              radius="md"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              radius="md"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button
              type="submit"
              className="bg-blue-600 m-auto"
              radius="xl"
              onClick={handelEmail}
            >
              SignUp
            </Button>
          </Group>
          <h4 className="text-[14px] my-1 text-gray-500">
            {" "}
            Already have an account?
            <Link to={"/login"} className="text-blue-600 font-medium">
              Login
            </Link>
          </h4>
          <Button
            onClick={handelGoogleLogOut}
            className="bg-red-500  w-[90px] text-[12px] hover:bg-red-600 duration-300"
            radius="xl"
          >
            Sign Out
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default SignUp;
