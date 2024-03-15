const btnCadastro= document.querySelector('.btnCadastro')
const formCadastro =document.getElementById('formCadastro')
const cadastro =document.getElementById('cadastro')
const btnCadastroForm =document.getElementById('btnCadastroForm')
const btnLogin= document.querySelector('.btnLogin')
const formLogin =document.getElementById('formLogin')
const Login =document.getElementById('Login')
const table = document.querySelector('.table')


const user={
    username:"jfmartinsvred",
    password:"Xmrx6612!"
}

const cadastroUsername = document.getElementById('cadastroUsername')
const cadastroNomeEmpresa = document.getElementById('cadastroNomeEmpresa')
const cadastroDataNascimento = document.getElementById('cadastroDataNascimento')
const cadastroCnpj = document.getElementById('cadastroCnpj')
const cadastroPassword = document.getElementById('cadastroPassword')
const cadastroRePassword = document.getElementById('cadastroRePassword')

const LoginUsername = document.getElementById('LoginUsername')
const LoginPassword = document.getElementById('LoginPassword')
async function postLogin(){
    const user={
        username:LoginUsername.value,
        password:LoginPassword.value
    }
    const response = await fetch('https://localhost:7126/Usuario/Login',{
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = await response.json()
    sessionStorage.setItem('token', data)
}


async function postCadastro(){

    const cadastro ={
        username:cadastroUsername.value,
        nomeEmpresa:cadastroNomeEmpresa.value,
        dataNascimento:cadastroDataNascimento.value,
        cnpj:cadastroCnpj.value,
        password:cadastroPassword.value,
        rePassword:cadastroRePassword.value
    }

    const response = await fetch('https://localhost:7126/Usuario/cadastro',{
        method:'POST',
        body:JSON.stringify(cadastro),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const data = response.json()
    console.log(cadastro)
}

let clientes =[{}]

async function getClientes(){
    const response = await fetch(`https://localhost:7126/Cliente?token=${sessionStorage.getItem('token')}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })


    const data = await response.json()
    clientes = data
    
}

function retornarHtmlClientes(){
    let clientesHtml=``

    for(let i=0;i<=clientes.length-1;i++){
        clientesHtml+=`
        <tr>
            <th scope="row">${i+1}</th>
            <td>${clientes[i].nome}</td>
            <td>${clientes[i].email}</td>
            <td>${clientes[i].telefone}</td>
        </tr>`
    }
    let html =
    `
    <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Telefone</th>
        </tr>
    </thead>
    <tbody>
        ${clientesHtml}
    </tbody>
`
table.innerHTML=html
}



formCadastro.addEventListener('submit', (e)=>{
    e.preventDefault()
    postCadastro()
})
formLogin.addEventListener('submit', (e)=>{
    e.preventDefault()
    postLogin()
    getClientes()
    console.log(clientes)
    retornarHtmlClientes()

})




