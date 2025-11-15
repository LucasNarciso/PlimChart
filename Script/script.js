var dashs = [
    {nome: "Teste 1", img:""},
    {nome: "Teste 2", img:""},
    {nome: "Teste 3", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
    {nome: "Teste 4", img:""},
]

function renderizarGaleria(){
    dashs.forEach((dash)=>{
        document.querySelector(`[id="page-dashboard"], [class*="plim-galeria"]`).insertAdjacentHTML('beforeEnd',`
            <article class="no-padding border s6 m3 l3">
                <img class="responsive small" src="${dash.img || 'Assets/Dash_template_img.png'}">
                <div class="small-padding">
                    <nav>
                        <h6>${dash.nome}</h6>
                        <div class="max"></div>
                        <button class="circle transparent">
                            <i>more_vert</i>
                            <menu class="top left no-wrap">
                                <li>Editar</li>
                                <li>Excluir</li>
                            </menu>
                        </button>
                    </nav>
                </div>
            </article>
        `)
    })
}

function carregarTema(){
    let tema = localStorage.getItem('tema') || 'light';
    document.body.setAttribute('class',tema)

    if(tema == "light"){
        document.getElementById('switch-tema').checked = false;
    }else{
        document.getElementById('switch-tema').checked = true;
    }
}

function trocarTema(campo){
    if(campo.checked){
        localStorage.setItem('tema','dark')
    }else{
        localStorage.setItem('tema','light')
    }

    carregarTema();
}

function limparDados(){
    console.log("Dados Excluidos!");
}

setTimeout( renderizarGaleria,500 )