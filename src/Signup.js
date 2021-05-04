import { useRef, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { refreshToken } from './refreshToken';
import './Signup.css';

function Signup(props) {
  const { socket } = props;
  
  const [isUserScreen, setUserScreen] = useState(false);
  const [userName, setUserName] = useState(null);
  
  const inputRef = useRef();
  
  const clientId = process.env.REACT_APP_LOGINID;

  const onSuccess = (userInfo) => {
    console.log('Login Success', userInfo.profileObj);
    console.log(userInfo.profileObj['email']);
    
    const userEmail = userInfo.profileObj['email']; //user's email
    const userPic = userInfo.profileObj['imageUrl']; //url of google profile image
    var loginFlag = 0; //tells server if signing in or signing up
    
    socket.emit('Login', { userName: userName, userEmail: userEmail, userPic: userPic, loginFlag: loginFlag });
    refreshToken(userInfo);
  };

  const onFailure = (failInfo) => {
    console.log('Login fail', failInfo);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  function registerUser() {
    console.log('register username');
    
    const name = inputRef.current.value; //username from text input
    
    setUserName(name);
    setUserScreen(true);
  }
  
  if (isUserScreen === true){
    return (
      <div>
      
        <div>
          <h1>Use your google account to sign up</h1>
        </div>
        
        <div>
          <button onClick={signIn} className="button">
            <span className="buttonText">Sign up with Google</span>
          </button>
        </div>
        
      </div>
    );
  }
  else if (isUserScreen === false){
    return (
      <div>
        <h1>Enter a username for your account</h1>
        <input ref={inputRef} type="text" className="textBox"/>
        
        <button onClick={registerUser} className="button">
          <span className="buttonText">register username</span>
        </button>
      </div>
    );
  }
  
}

export default Signup;
