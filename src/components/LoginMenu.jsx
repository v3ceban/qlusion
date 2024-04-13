export default function LoginMenu() {
  return (
    <aside className="asideMenu container login">
      <h3>Login</h3>
      <form
        method="POST"
        className="login"
        onSubmit={(e) => e.preventDefault()}
      >
        <label>
          Email:
          <input type="email" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <a href="#">Forgot password?</a>
        <button type="submit">Submit</button>
      </form>
    </aside>
  );
}
