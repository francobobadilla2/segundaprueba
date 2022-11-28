import './App.css';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

function App() {
  const [signedInUser, setSignedInUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setSignedInUser(user);
      console.log(user);
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="App">
      { signedInUser === null ?
        <h3>Inicia sesión con Google.</h3> :
        <h3>Bienvenido { signedInUser.attributes.email }</h3>
      }
      { signedInUser === null ?
        <button onClick={() => {Auth.federatedSignIn({ provider: 'Google' })}}>Google sign in</button> :
        <button onClick={() => {Auth.signOut()}}>Sign out</button>
      }
    </div>
  );
}

export default App;
