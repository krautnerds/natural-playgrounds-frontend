import React from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import Layout from "../components/layout";
import { withAuthSync } from "../lib/auth";
import axios from "axios";

const Profile = (props) => {
  const { name, login, bio, avatarUrl } = this.props.data;

  return <Layout>Test</Layout>;
};

Profile.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  var environment = process.env.API_URL || "http://localhost:8000";
  const apiUrl = `${environment}/api/account/`;

  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end();

  try {
    const response = await axios.post(apiUrl, {
      token: token,
    });

    if (response.ok) {
      console.error("test");
      const js = await response.json();
      return js;
    } else {
      console.log(response);
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError();
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError();
  }
};

export default withAuthSync(Profile);
