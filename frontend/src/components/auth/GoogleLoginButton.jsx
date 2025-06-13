import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

function GoogleLoginButton() {
  const navigate = useNavigate();
  const { signinWithGoogle } = useAuth();

  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    try {
      await signinWithGoogle(idToken);
      alert('Googleログイン成功！');
      navigate('/top');
    } catch (error) {
      alert('Googleログインに失敗しました');
    }
  };

  return (
    <GoogleOAuthProvider clientId="49437462560-b5jq6g1612ajea8qe7plni1fjtjgoefs.apps.googleusercontent.com">
      <div>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
