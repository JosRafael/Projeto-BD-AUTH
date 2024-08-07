import { useState, useEffect } from 'react'
import './admin.css'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})
  const [edit, setEdit] = useState('')

  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail)
        const tarefaRef = collection(db, 'tarefas')

        const q = query(
          tarefaRef,
          orderBy('created', 'desc'),
          where('userUid', '==', data?.uid)
        )
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = []

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            })
          })
          setTarefas(lista)
        })
      }
    }
    loadTarefas()
  }, [])

  async function handleRegister(e) {
    e.preventDefault()

    if (tarefaInput === '') {
      alert('Digite uma tarefa')
      return
    }
    if (edit?.id) {
      handleUpdateTarefa()
      return
    }
    await addDoc(collection(db, 'tarefas'), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        alert('Tarefa adicionada com sucesso! ')
        setTarefaInput('')
      })
      .catch((e) => {
        console.error('Um erro ocorreu ao cadastrar a tarefa', e)
      })
  }

  async function handleLogout() {
    await signOut(auth)
  }

  async function handleDelete(id) {
    const docRef = doc(db, 'tarefas', id)
    await deleteDoc(docRef)
      .then(() => {
        alert('Deletado com sucesso!')
      })
      .catch((e) => {
        console.error('erro ao deletar', e)
      })
  }

  function editTarefa(item) {
    setTarefaInput(item.tarefa)
    setEdit(item)
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, 'tarefas', edit?.id)
    await updateDoc(docRef, {
      tarefa: tarefaInput,
    })
      .then(() => {
        console.log('TAREFA ATUALIZADA')
        setTarefaInput('')
        setEdit({})
      })
      .catch((e) => {
        console.error('erro ao atualizar', e)
        setTarefaInput('')
        setEdit({})
      })
  }

  return (
    <div className="admin-container">
      <h1>Minhas tarefas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa"
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        {Object.keys(edit).length > 0 ? (
          <button
            className="btn-register"
            style={{ backgroundColor: '#6add39' }}
            type="submit"
          >
            Atualizar tarefa
          </button>
        ) : (
          <button className="btn-register" type="submit">
            Registrar tarefa
          </button>
        )}
      </form>

      {tarefas.map((item) => (
        <article key={item.id} className="list">
          <p>{item.tarefa}</p>

          <div>
            <button onClick={() => editTarefa(item)}>Editar</button>
            <button
              onClick={() => handleDelete(item.id)}
              className="btn-delete"
            >
              Concluir
            </button>
          </div>
        </article>
      ))}
      
      <button onClick={handleLogout} className="btn-logout">
        Sair
      </button>
    </div>
  )
}
