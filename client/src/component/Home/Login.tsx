import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

export const Login = () => {
    const handleLogin = async (credentialResponse: CredentialResponse) => {
        const res = await fetch("/auth", {
            method: "POST",
            body: JSON.stringify({
            token: credentialResponse
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
        // we will come back to this, since our server will be replying with our info
    }
    
    const handleError = () => {
        console.error("There has been an error");
    }
        
    return (
        <div className="loginComponent">
            <GoogleLogin
                onSuccess={handleLogin}
                onError={handleError}        
                />
        </div>
    )
}