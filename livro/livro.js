const endereco_base = 'http://localhost:8091/api/v1'

const endereco =  endereco_base + '/livros'

let livros = [];

let isUpdate = false;

async function buscarLivros (){
    let resposta = await fetch(endereco);
    livros = await resposta.json();

    for (let index = 0; index < livros.length; index++) {
        const livro = livros[index];
        const tbody = document.getElementsByTagName('tbody')[0];

        tbody.innerHTML += `
            <td>
                ${livro.ID_Livro}
            </td>
            <td>
                ${livro.Nome_Livro}
            </td>
            <td>
                ${livro.ISBN}
            </td>
            <td>
                ${livro.Data_Pub}
            </td>
            <td>
                ${livro.Preco_Livro}
            </td>
            <td>
                ${livro.ID_Autor}
            </td>
            <td>
                ${livro.ID_editora}
            </td>
            <td>
                <button type="button" onclick="prepararEdicao(${livro.ID_Livro})">
                    Editar
                </button>
                <button type="button" onclick="eliminarLivro(${livro.ID_Livro})">Eliminar</button>
            </td>
    `
}
}

function prepararEdicao(id) {
   
    const livro = livros.find((livro) => livro.ID_Livro == id);

    document.getElementById('id').value = livro.ID_Livro;
    document.getElementById('nome').value = livro.Nome_Livro;
    document.getElementById('isbn').value = livro.ISBN;
    document.getElementById('data_publicacao').value = livro.Data_Pub;
    document.getElementById('preco_livro').value = livro.Preco_Livro;
    document.getElementById('id_autor').value = livro.ID_Autor;
    document.getElementById('id_editora').value = livro.ID_editora
    isUpdate = true
}

function submeter(e) {
    e.preventDefault();
    if(isUpdate) {
        actualizarlivro()
    }
    else {
        guardarlivro() 
    }
}

async function actualizarlivro() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const isbn = document.getElementById('isbn').value;
    const data_publicacao =document.getElementById('data_publicacao').value;
    const preco_livro = document.getElementById('preco_livro').value;
    const id_autor = document.getElementById('id_autor').value;
    const id_editora = document.getElementById('id_editora').value;

    const data = {
        Nome_Livro: nome,
        ISBN: isbn,
        Data_Pub: data_publicacao,
        Preco_Livro: preco_livro,
        ID_Autor: id_autor,
        ID_editora: id_editora
    }

    await fetch(endereco + '/' + id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    alert("Livro actualizado com sucesso");
    limparTudo();
    buscarLivros();
}

async function eliminarLivro(id) {
await fetch(endereco + '/' + id, {
    method: 'DELETE'
});

alert("Livro eliminado com sucesso");
limparTudo();
buscarLivros();
}


function limparTudo() {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    isUpdate = false;
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('data_publicacao').value = '';
    document.getElementById('preco_livro').value = '';
    document.getElementById('id_autor').value = '';
    document.getElementById('id_editora').value = '';
}

async function guardarLivro(e) {
    e.preventDefault();
    const Nome_Livro = document.getElementById('nome').value;
    const ISBN = document.getElementById('isbn').value;
    const Data_Pub = document.getElementById('data_publicacao').value;
    const Preco_Livro = document.getElementById('preco_livro').value;
    const ID_livro = document.getElementById('id_livro').value;
    const ID_editora = document.getElementById('id_editora').value;

    const data = {
        Nome_Livro,
        ISBN,
        Data_Pub,
        Preco_Livro,
        ID_livro,
        ID_editora
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
    buscarLivros();
}



const enderecoAutores = endereco_base + '/autores'

async function buscarAutores() {
    let resposta = await fetch(enderecoAutores);
    const autores = await resposta.json();
    for (let index = 0; index < autores.length; index++) {
        const autor = autores[index];
        const select = document.getElementById('id_autor');

        select.innerHTML += `
            <option value="${autor.ID_Autores}">
                ${autor.Nome_Autor} ${autor.SobreNome_Autor}
            </option>
        `
    }
}

const enderecoEditoras = endereco_base + '/editoras'

async function buscarEditoras() {
    let resposta = await fetch(enderecoEditoras);
    const editoras = await resposta.json();
    for (let index = 0; index < editoras.length; index++) {
        const editor = editoras[index];
        const select = document.getElementById('id_editora');

        select.innerHTML += `
            <option value="${editor.ID_Editora}">
                ${editor.Nome_Editora}
            </option>
        `

    }
}

buscarLivros();
buscarAutores();
buscarEditoras();