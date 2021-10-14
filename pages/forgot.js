import { useState } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
const Login = () => {
  const [email, setEmail] = useState("");
  const { addToast } = useToasts();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      var environment =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await axios.post(`${environment}/api/forgot/`, {
        email: email,
      });
      if (res.status === 200) {
        addToast(
          "Please check your email for information on resetting the password.",
          { appearance: "success", autoDismiss: true, autoDismissTimeout: 3000 }
        );
        setEmail("");
      } else {
        addToast("Issue resetting your password.", {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        throw new Error(await res.data);
      }
    } catch (error) {
      addToast("Issue resetting your password.", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  }

  return (
    <div className="login wide-load py-12 lg:py-16 flex flex-col space-y-12">
      <div className="w-full">
        <h1 className="text-center text-4xl">
          Enter your information below To reset your password
        </h1>
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
          <div>
            <label>
              <span>Email Name</span>
              <input
                type="email"
                name="email"
                required
                className="input"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div></div>
          <div className="flex flex-row justify-between w-full items-center space-x-0 md:space-x-4">
            <>
              <button type="submit" className="button w-1/2">
                Forgot Password
              </button>
            </>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
