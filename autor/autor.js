const endereco = 'http://localhost:8091/api/v1/autores'

let autores = [];

let isUpdate = false;

async function buscarAutores() {
    let resposta = await fetch(endereco);
    autores = await resposta.json();
    for (let index = 0; index < autores.length; index++) {
        const autor = autores[index];
        const tbody = document.getElementsByTagName('tbody')[0];

        tbody.innerHTML += `
            <td>
                ${autor.ID_Autores}
            </td>
            <td>
                ${autor.Nome_Autor}
            </td>
            <td>
                ${autor.SobreNome_Autor}
            </td>
            <td>
                <button type="button" onclick="prepararEdicao(${autor.ID_Autores})">
                    Editar
                </button>
                <button type="button" onclick="eliminarAutor(${autor.ID_Autores})">
                    Eliminar
                </button>
            </td>
        `

    }
}

function prepararEdicao(id) {
    const autor = autores.find((autor) => autor.ID_Autores == id);
    document.getElementById('id').value = autor.ID_Autores;
    document.getElementById('nome').value = autor.Nome_Autor;
    document.getElementById('sobrenome').value = autor.SobreNome_Autor;
    isUpdate = true
}

function submeter(e) {
    e.preventDefault();
    if(isUpdate) {
        actualizarAutor()
    }
    else {
        guardarAutor() 
    }
}

async function actualizarAutor() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;

    const data = {
        Nome_Autor: nome,
        SobreNome_Autor: sobrenome
    }
    await fetch(endereco + '/' + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    alert("Autor actualizado com sucesso");
    limparTudo();
    buscarAutores();
}

async function eliminarAutor(id) {
    await fetch(endereco + '/' + id, {
        method: 'DELETE'
    });

    alert("Autor eliminado com sucesso");
    limparTudo();
    buscarAutores();
}

function limparTudo() {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    isUpdate = false;
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
}

async function guardarAutor() {
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;

    const data = {
        Nome_Autor: nome,
        SobreNome_Autor: sobrenome
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
    buscarAutores();
}

buscarAutores();