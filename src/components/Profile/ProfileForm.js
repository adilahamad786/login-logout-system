import { useRef, useContext } from 'react';

import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const AuthCtx = useContext(AuthContext);

  const submitHandler = event => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // validate enteredNewPassword

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBSSstQOp1QYXeYnJ7Yg2rPKPK3eREVHNk", {
      method : "POST",
      body : JSON.stringify({
        idToken : AuthCtx.token,
        password : enteredNewPassword,
        returnSecureToken : false
      }),
      headers : {
        'Content-Type' : 'application/json'
      }
    }).then(res => {
      // assumption : always succeeds!
    })

  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
