import React from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import Layout from "../components/layout";
import { withAuthSync } from "../lib/auth";

const Profile = (props) => {
  const { name, login, bio, avatarUrl } = this.props.data;

  return <Layout>Test</Layout>;
};

Profile.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  const apiUrl = `${process.env.API_URL}/api/profile/`;

  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end();

  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        Authorization: JSON.stringify({ token }),
      },
    });

    if (response.ok) {
      const js = await response.json();
      console.log("js", js);
      return js;
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError();
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError();
  }
};

export default withAuthSync(Profile);
