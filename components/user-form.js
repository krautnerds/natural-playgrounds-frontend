import Link from "next/link";

const Form = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit} className="flex flex-col space-y-6">
    <label>
      <span>Email Address</span>
      <input type="email" name="email" required className="input" />
    </label>
    <label>
      <span>Password</span>
      <input type="password" name="password" required className="input" />
    </label>
    {!isLogin && (
      <label>
        <span>Repeat password</span>
        <input type="password" name="password2" required />
      </label>
    )}
    <div className="flex flex-row justify-between w-full items-center">
      {isLogin ? (
        <>
          <Link href="" className="w-1/2">
            Forgot Password
          </Link>
          <button type="submit" className="button w-32">
            Login
          </button>
        </>
      ) : (
        <>
          <Link href="" className="w-1/2">
            Login to existing account?
          </Link>
          <button type="submit" className="button w-32">
            Signup
          </button>
        </>
      )}
    </div>

    {errorMessage && (
      <p className="p-4 bg-red-400 border-left-4 border-red-900 my-4">
        {errorMessage}
      </p>
    )}
  </form>
);

export default Form;
