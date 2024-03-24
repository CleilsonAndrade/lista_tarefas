import React, { useEffect, useState } from "react"
import './TodoList.css'
import Icon from './assets/icon.webp'

export default function App() {
  const listStorage = localStorage.getItem('Lista')

  const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : [])
  const [newItem, setNewItem] = useState("")

  useEffect(() => {
    localStorage.setItem('Lista', JSON.stringify(list))
  }, [list])

  function addItem(form) {
    form.preventDefault()

    if (!newItem) {
      alertify.alert('Lista de Tarefas', 'Adicione alguma tarefa!');
      return
    }

    setList([...list, { text: newItem, isCompleted: false }])
    setNewItem("")
    alertify.success('Tarefa adicionada &#9997;')
    document.getElementById('inputEntrada').focus()
  }

  function itemCompleted(index) {
    const listAux = [...list]

    if (listAux[index].isCompleted == false) {
      alertify.success('Tarefa completada &#9989;')
    }

    listAux[index].isCompleted = !listAux[index].isCompleted

    if (listAux[index].isCompleted == false) {
      alertify.success('Tarefa adicionada novamente &#9989;')
    }
    setList(listAux)
  }

  function deleteItem(index) {
    const listAux = [...list]
    listAux.splice(index, 1)
    setList(listAux)
    alertify.error('Tarefa excluída &#9940;')
  }

  function deleteAllItem() {
    setList([])
    alertify.error('Todas as tarefas deletadas &#9940;')
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={addItem}>
        <input
          id="inputEntrada"
          value={newItem}
          onChange={(e) => { setNewItem(e.target.value) }}
          type="text"
          placeholder="Adicione uma tarefa"
        />
        <button className="add" type="submit">Adicionar</button>
      </form>
      <div className="todo-list-container">
        <div>
          {
            list.length < 1
              ?
              <img className="icon" src={Icon} />
              :
              list.map((item, index) => (
                <div
                  key={index}
                  className={item.isCompleted ? "item complete" : "item"}
                >
                  <span
                    onClick={() => { itemCompleted(index) }}
                  >
                    {item.text}
                  </span>
                  <button
                    onClick={() => { deleteItem(index) }}
                    className="del"
                  >
                    Excluir
                  </button>
                </div>
              )
              )
          }

          {
            list.length > 0 &&
            <button onClick={() => { deleteAllItem() }} className="deleteAll">
              Excluir todas
            </button>
          }

        </div>
      </div>
    </div >
  )
}