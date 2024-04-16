/* eslint-disable react/prop-types */
export default function LoginMenu(props) {
  const LoginForm = () => (
    <form method="POST" className="login" onSubmit={(e) => e.preventDefault()}>
      <label>
        Email:
        <input type="email" placeholder="email@example.com" />
      </label>
      <label>
        Password:
        <input type="password" placeholder="********" />
      </label>
      <a
        href="#"
        className="forgotPassword"
        onClick={() => props.setWhichMenu("reset password")}
      >
        Forgot password?
      </a>
      <button type="submit">Submit</button>
      <button
        className="danger"
        type="reset"
        onClick={() => props.setLoginMenu(false)}
      >
        Cancel
      </button>
      <p className="prompt">
        Don&apos;t have an account?{" "}
        <a href="#" onClick={() => props.setWhichMenu("sign-up")}>
          Sign-up
        </a>
      </p>
    </form>
  );

  const RegisterForm = () => (
    <form method="POST" className="login" onSubmit={(e) => e.preventDefault()}>
      <label>
        Email:
        <input type="email" placeholder="email@example.com" />
      </label>
      <label>
        Password:
        <input type="password" placeholder="********" />
      </label>
      <label>
        Confirm Password:
        <input type="password" placeholder="********" />
      </label>
      <button type="submit">Submit</button>
      <button
        className="danger"
        type="reset"
        onClick={() => props.setLoginMenu(false)}
      >
        Cancel
      </button>
      <p className="prompt">
        Already have an account?{" "}
        <a href="#" onClick={() => props.setWhichMenu("login")}>
          Login
        </a>
      </p>
    </form>
  );

  const ForgotPassword = () => (
    <form method="POST" className="login" onSubmit={(e) => e.preventDefault()}>
      <p className="forgot">
        Enter your email and we&apos;ll send you a link to reset your password
        if there is such account.
      </p>
      <label>
        Email:
        <input type="email" placeholder="email@example.com" />
      </label>
      <button type="submit">Submit</button>
      <button
        className="danger"
        type="reset"
        onClick={() => props.setLoginMenu(false)}
      >
        Cancel
      </button>
    </form>
  );

  return (
    <aside className="asideMenu container login">
      <h3>{props.menu}</h3>
      {props.menu === "login" && <LoginForm />}
      {props.menu === "sign-up" && <RegisterForm />}
      {props.menu === "reset password" && <ForgotPassword />}
    </aside>
  );
}
