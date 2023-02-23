import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export const Login = () => {
    const [username, setUsername] = useState("");

    const handleLogin = async (credentialResponse: CredentialResponse) => {
        const res = await fetch("/api/auth", {
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
        console.log(data);
        setUsername(data.user.name);
    }
    
    const handleError = () => {
        console.error("There has been an error");
    }

    const handleLogout = async () => {
        await fetch("/logout");
        setUsername("");
    }
        
    const protectedRoute = async () => {
        const response = await fetch("/protected");
        if (response.status === 200) {
            alert("You are authorized to see this!");
        } else if (response.status === 401)  {
            alert("You are not authorized to see this!");
        } else {
            alert("Something went wrong!");
        }
    }

    return (
        <>
            <h2>Welcome {username ? username : "Anonymous"}</h2>

            <div className="loginComponent">
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={handleError}        
                    />
            </div>   

            {!username && <GoogleLogin
                onSuccess={handleLogin}
                onError={() => {
                console.log('Login Failed');
                }} /> }

            {username && <button onClick={handleLogout}>Logout</button> } 
                
            <button onClick={protectedRoute}>Test protected</button>
        </>
    )
}