import { useState } from "react"
import "./admin.css"
import {auth} from '../../firebaseConnection'
import { signOut } from "firebase/auth";
export default function Admin(){
    const [tarefaInput, setTarefaInput] = useState('');

    function handleRegister(e){
        e.preventDefault();

        alert("CLICOU");
    }

    async function handleLogout(){
        await signOut(auth);
    }

    return(
        <div className="admin-container">
            <h1>Minhas tarefas</h1>

            <form className="form" onSubmit={handleRegister}>
                <textarea
                placeholder="Digite sua tarefa"
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}
                />

                <button className="btn-register" type="submit">Registrar tarefa</button>
            </form>

            <article className="list">
                <p>
                    Estudar JS e React está noite
                </p>

                <div>
                    <button>Editar</button>
                    <button className="btn-delete">Concluir</button>
                </div>
            </article>

            <button onClick={handleLogout} className="btn-logout">Sair</button>
        </div>
    )
}