import React from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { getAuth, signInWithPopup, GoogleAuthProvider ,signOut} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser, removeUser} from "../redux/shopSlice";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();
const auth = getAuth()
const provider = new GoogleAuthProvider();
const handelGoogleLogin =(e)=>{
  e.preventDefault();
  signInWithPopup(auth,provider).then((result)=>{
    const user = result.user;
    dispatch(addUser({
      _id:user.uid,
      name:user.displayName,
      image:user.photoURL,
      email:user.email
    }));
    console.log(user);
    setTimeout(()=>{
navigate('/')
    },1500)
  }).catch((error)=>{console.log(error);})
}
const handelGoogleLogOut=(e)=>{
  e.preventDefault();
  signOut(auth).then(()=>{toast.success("logOut");dispatch(removeUser())}).catch((error)=>console.log(error))
}
  return (
    <div className="max-w-[400px] w-[400px] mx-auto my-16">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Mantine, {type} with
        </Text>

        <Group grow mb="md" mt="md" className="justify-center"> 
          <div className="flex items-center flex-1 sm:min-w-[166px] min-w-[100%] p-3 gap-1  justify-center rounded-[8px]  shadow-md text-[14px] cursor-pointer" onClick={handelGoogleLogin}>
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

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
          <button onClick={handelGoogleLogOut}>Sign Out</button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
