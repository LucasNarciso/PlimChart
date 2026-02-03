var dashs = [
    {nome: "dashboard 1", img:""},
    {nome: "dashboard 2", img:""},
    {nome: "dashboard 3", img:""},
    {nome: "dashboard 4", img:""},
    {nome: "dashboard 5", img:""},
    {nome: "dashboard 6", img:""},
    {nome: "dashboard 7", img:""},
    {nome: "dashboard 8", img:""},
    {nome: "dashboard 9", img:""},
    {nome: "dashboard 10", img:""},
    {nome: "dashboard 11", img:""},
    {nome: "dashboard 12", img:""},
    {nome: "dashboard 13", img:""},
    {nome: "dashboard 14", img:""},
    {nome: "dashboard 15", img:""},
    {nome: "dashboard 16", img:""},
    {nome: "dashboard 17", img:""},
    {nome: "dashboard 18", img:""},
    {nome: "dashboard 19", img:""},
    {nome: "dashboard 20", img:""},
    {nome: "dashboard 21", img:""},
    {nome: "dashboard 22", img:""},
    {nome: "dashboard 23", img:""},
    {nome: "dashboard 24", img:""},
    {nome: "dashboard 25", img:""},
]
var origens = [
    {nome: "Origem 0", img:""},
    {nome: "Origem 1", img:""},
    {nome: "Origem 2", img:""},
    {nome: "Origem 3", img:""},
    {nome: "Origem 4", img:""},
    {nome: "Origem 5", img:""},
    {nome: "Origem 6", img:""},
    {nome: "Origem 7", img:""},
    {nome: "Origem 8", img:""},
    {nome: "Origem 9", img:""},
    {nome: "Origem 10", img:""},
    {nome: "Origem 11", img:""},
    {nome: "Origem 12", img:""},
    {nome: "Origem 13", img:""},
    {nome: "Origem 14", img:""},
    {nome: "Origem 15", img:""},
    {nome: "Origem 16", img:""},
    {nome: "Origem 17", img:""},
]

function renderizarGaleria(){
    dashs.forEach((dash)=>{
        document.querySelector(`[id="page-dashboard"], [class*="plim-galeria"]`).insertAdjacentHTML('beforeEnd',`
            <article class="no-padding border s6 m3 l3">
                <div class="responsive max"> <i class="padding extra" style="margin:auto;">analytics</i> </div>
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

function renderizarOrigens(){
    origens.forEach((ori)=>{
        
        document.querySelector(`[id="lista-origens"]`).insertAdjacentHTML('beforeEnd',`
            <div class="no-padding max origem">
                <nav class="border small-round">
                    <h6 class="left-margin max">${ori.nome}</h6>
                    <button class="square transparent"> <i>edit</i> </button>
                    <button class="square transparent"> <i>delete</i> </button>
                </nav>
            </div>
        `)
        
    })
}



async function carregarConfigs(){
    // let configs = JSON.parse(localStorage.getItem('plim-opts')) || {};
    if(!plimDB.db){
        setTimeout ( carregarConfigs,100 );
        return;
    }
    let configs = await plimDB.getAll("Configuracoes") || {};
    
    let switchTema = document.getElementById('switch-tema');
    let configTema = configs.find(c=>c.id=="tema");
    switchTema.checked = configTema && configTema.valor == "dark";
    trocarTema(switchTema)
    
    let switchSobre = document.getElementById("switch-sobre");
    let configSobre = configs.find(c=>c.id=="btnSobre");
    switchSobre.checked = configSobre && configSobre.valor;
    desabilitarSobre(switchSobre)

}

async function salvarConfigs(config, valor){
    // let configs = JSON.parse(localStorage.getItem('plim-opts')) || {};

    let configNova = {id:"",valor:""}
    configNova.id = config;
    configNova.valor = valor;

    // localStorage.setItem('plim-opts',JSON.stringify(configs));
    await plimDB.add("Configuracoes", configNova);
}

function trocarTema(campo){
    if(campo.checked){
        salvarConfigs('tema','dark')
        document.body.setAttribute('class','dark')
    }else{
        salvarConfigs('tema','light')
        document.body.setAttribute('class','light')
    }
}

function limparDados(){
    console.log("Dados Excluidos!");
    localStorage.clear();
    carregarConfigs();
}

function desabilitarSobre(campo){
    salvarConfigs('btnSobre',campo.checked)
    if(campo.checked){
        document.querySelectorAll('[data-name="botao-sobre"]').forEach(btn=>btn.setAttribute('class','plim-oculto'));
    }else{
        document.querySelectorAll('[data-name="botao-sobre"]').forEach(btn=>btn.removeAttribute('class'));
    }
}

setTimeout( renderizarGaleria,500 )
setTimeout( renderizarOrigens,500 )