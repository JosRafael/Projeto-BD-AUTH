import { useState } from 'react'
import { auth } from "../../firebaseConnection";
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function handleRegister(e){
    e.preventDefault()

    if(email !== "" && password !==""){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Register success!")
        navigate("/admin", {replace: true});
      })
      .catch((e) => {
        console.error("erro ao realizar login", e);
      });
    } else {
      alert("PREENCHA TODOS OS CAMPOS");
    }   
  }

  return(
    <div className='home-container'>
      <h1>Cadastre-se</h1>
      <span>Vamos criar a sua conta</span>

      <form className='form' onSubmit={handleRegister}>
        <input 
          type='text'
          placeholder='Digite seu email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          autoComplete="off"
          type='password'
          placeholder='*******'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Cadastrar</button>
      </form>
      <Link className="button-link" to='/'>Já possui uma conta? Faça login!</Link>
    </div>
  )
}
