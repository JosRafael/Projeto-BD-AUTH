import { useState, useEffect } from "react"
import "./admin.css"
import {auth, db} from '../../firebaseConnection'
import { signOut } from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";
export default function Admin(){
    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState('')

    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))
        }
        loadTarefas()
    }, [])

    async function handleRegister(e){
        e.preventDefault();

        if(tarefaInput === ''){
            alert("Digite uma tarefa")
            return;
        }
        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            alert("Tarefa adicionada com sucesso! ")
            setTarefaInput('')
        })
        .catch((e)=>{
            console.error("Um erro ocorreu ao cadastrar a tarefa", e)
        })
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