import React, {useState} from 'react';


import 'firebase/auth';
import firebase from 'firebase';



const Login =()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit =async() =>{
        firebase.auth().createUserWithEmailAndPassword(email,password);
    }
    return(
        <div>
            <br/>
            <br/>
        
            <form className= "singin">

                <img className="Sing" src="https://image.flaticon.com/icons/svg/149/149995.svg "  width="50" height="50" />
                <h1 className="font-weight-normal"> 
                    Inicia sesión
                </h1>
                <label for="inputEmail" className="sr-only"> corréo:  </label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email" required autoFocus  onChange ={(ev)=> setEmail(ev.target.value) }/>
                <label for="inputPassword" className="sr-only"> contraseña:  </label>
                <input type="password" id="inputPassword"  className="form-control" placeholder="Password" required autoFocus onChange ={(ev)=> setPassword(ev.target.value) }/>
                <button  onClick={submit}>
                        crear cuenta
                </button>

                <p className="mt-5 mb-3 text-muted">Papeleria Mont-RA</p>            

            </form>

    
        </div>
    )
 
}

export default Login;