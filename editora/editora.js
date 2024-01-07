const endereco = 'http://localhost:8091/api/v1/editoras'
let editoras = [];

let isUpdate = false;

async function buscarEditoras() {
    let resposta = await fetch(endereco);
    editoras = await resposta.json();

    for (let index = 0; index < editoras.length; index++) {
        const editora = editoras[index];
        const tbody = document.getElementsByTagName('tbody')[0];

        tbody.innerHTML += `
            <td>
                ${editora.ID_Editora}
            </td>
            <td>
                ${editora.Nome_Editora}
            </td>
            <td>
            <button type="button" onclick="prepararEdicao(${editora.ID_Editora})">
                    Editar
                </button>
            <button type="button" onclick="eliminarEditora(${editora.ID_Editora})">Eliminar</button>
        </td>
    `
    }
}

function prepararEdicao(id) {
    const editora = editoras.find((editora) => editora.ID_Editora == id);
    document.getElementById('id').value = editora.ID_Editora;
    document.getElementById('nome').value = editora.Nome_Editora;
    isUpdate = true
}

function submeter(e) {
    e.preventDefault();
    if(isUpdate) {
        actualizarEditora()
    }
    else {
        guardarEditora() 
    }
}

async function actualizarEditora() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;

    const data = {
        Nome_Editora: nome,
    }
    await fetch(endereco + '/' + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    alert("Editora actualizada com sucesso");
    limparTudo();
    buscarEditoras();
}

async function eliminarEditora(id) {
    await fetch(endereco + '/' + id, {
        method: 'DELETE'
    });

    alert("Editora eliminada com sucesso");
    limparTudo();
    buscarEditoras();
}


function limparTudo() {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    isUpdate = false;
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
}

async function guardarEditora(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;

    const data = {
        Nome_Editora: nome
    }
    let resposta = await fetch(endereco, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    const respostaAPI = await resposta.json();
    alert(respostaAPI.mensagem);
    limparTudo();
    buscarEditoras();
}

buscarEditoras();