const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sData = document.querySelector('#m-data')
const sLocal = document.querySelector('#m-local')
const sDescricao = document.querySelector('#m-descricao')
const sParticipantes = document.querySelector('#m-participantes')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sData.value = itens[index].data
    sLocal.value = itens[index].local
    sDescricao.value = itens[index].descricao
    sParticipantes.value = itens[index].participantes
    id = index
  } else {
    sNome.value = ''
    sData.value = ''
    sLocal.value = ''
    sDescricao.value = ''
    sParticipantes.value = ''
  }
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.data}</td>
    <td>${item.local}</td>
    <td>${item.descricao}</td>
    <td>${item.participantes}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  if (sNome.value == '' || sData.value == '' || sLocal.value == '' || sDescricao.value == '' || sParticipantes.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].data = sData.value
    itens[id].local = sLocal.value
    itens[id].descricao = sDescricao.value
    itens[id].participantes = sParticipantes.value
  } else {
    itens.push({
      'nome': sNome.value,
      'data': sData.value,
      'local': sLocal.value,
      'descricao': sDescricao.value,
      'participantes': sParticipantes.value
    })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbEventos')) ?? []
const setItensBD = () => localStorage.setItem('dbEventos', JSON.stringify(itens))

loadItens()
