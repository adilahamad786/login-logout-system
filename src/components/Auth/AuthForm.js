import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const AuthCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Optional : validate email & password
  
    setIsLoading(true);
    
    let url;
    if (isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSSstQOp1QYXeYnJ7Yg2rPKPK3eREVHNk";
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSSstQOp1QYXeYnJ7Yg2rPKPK3eREVHNk";
    }

    fetch(url,{
      method : 'POST',
      body : JSON.stringify({
        email : enteredEmail,
        password : enteredPassword,
        returnSecureToken : true
      }),
      headers : {
        'Content-Type' : "application/json"
      }
    }).then(response => {
      setIsLoading(false);
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(responseData => {
          // Show an error modal
          // console.log(responseData);
          let errorMessage = 'Authentication failed!';
          if (responseData && responseData.error && responseData.error.message) {
            errorMessage = responseData.error.message;
          }
          throw new Error(errorMessage);
        })
      }
    }).then( responseData => {
      AuthCtx.login(responseData.idToken)
      console.log(responseData);
    }).catch( error => {
      alert(error);
    })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          { !isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          { isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
