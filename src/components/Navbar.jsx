import logo from '../assets/fes_logo.png';
function Navbar({ user, loading, onLogin, onRegister, onLogout, authMessage, onCreatePost, getAllPosts }) {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <img className="nav-logo" src={logo} alt="logo" />

        </div>
        {!loading && !user.email && (
          <div className="navbar-right">
            <button className="btn btn-login" onClick={onLogin}>Login</button>
            <button className="btn btn-register" onClick={onRegister}>Register</button>
            
          </div>
        )}
      </div>
      <div className="nav-links">
        {loading ? (
          "Loading..."
        ) : user.email ? (
          <div className="nav-auth-row">
            <div className="nav-auth-left" />
            <div className="nav-center-col">
              <p className="nav__title--para">My App</p>
              <div className="nav-welcome"><span className="purple">Welcome,</span> {user.email}</div>
            </div>
            <div className="nav-logout">
              <button className="btn btn-get-posts" onClick={getAllPosts}>Get Posts</button>
              <button className="btn btn-create-post" onClick={onCreatePost}>Create Post</button>
              <button className="logout-button" aria-label="Logout" onClick={onLogout}>
                {user?.email ? user.email.trim().charAt(0).toUpperCase() : ''}
              </button>
            </div>
          </div>
        ) : (
          authMessage ? <div className="auth-message">{authMessage}</div> : null
        )}
      </div>
    </nav>
  );
}
export default Navbar;
