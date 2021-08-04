import { useState } from "react";
import Router from "next/router";
import Form from "../components/user-form";
import axios from "axios";
import { login } from "../lib/auth";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    try {
      var environment = process.env.API_URL || "http://localhost:8000";
      const res = await axios.post(`http://localhost:8000/api/auth-token/`, {
        username: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      });
      if (res.status === 200) {
        const { token } = await res.data;
        await login({ token });
        Router.push("/account");
      } else {
        throw new Error(await res.data);
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        setErrorMsg(error.response.data.non_field_errors[0]);
      }
    }
  }

  return (
    <div className="login wide-load py-12 lg:py-16 flex flex-wrap">
      <div className="w-full md:w-1/2">
        <h1 className="text-center text-4xl">Login</h1>
      </div>
      <div className="w-full md:w-1/2">
        <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;
