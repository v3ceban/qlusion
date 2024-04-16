/* eslint-disable react/prop-types */
export default function LoginMenu(props) {
  return (
    <aside className="asideMenu container login">
      <h3>{props.menu}</h3>
      <form
        method="POST"
        className="login"
        onSubmit={(e) => e.preventDefault()}
      >
        <label>
          Email:
          <input type="email" placeholder="email@example.com" />
        </label>
        <label>
          Password:
          <input type="password" placeholder="********" />
        </label>
        <a href="#" className="forgotPassword">
          Forgot password?
        </a>
        <button type="submit">Submit</button>
      </form>
    </aside>
  );
}
