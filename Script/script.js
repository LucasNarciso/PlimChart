var dashs = [
    {nome: "dashboard 1", img:""},
    {nome: "dashboard 2", img:""},
    {nome: "dashboard 3", img:""},
    {nome: "dashboard 4", img:""},
    {nome: "dashboard 5", img:""},
    {nome: "dashboard 6", img:""},
    {nome: "dashboard 7", img:""},
    {nome: "dashboard 8", img:""},
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

function carregarConfigs(){
    let configs = JSON.parse(localStorage.getItem('plim-opts'));
    
    if(!configs) return;
    
    let switchTema = document.getElementById('switch-tema');
    switchTema.checked = (configs.tema == "dark");
    trocarTema(switchTema)
    
    let switchSobre = document.getElementById("switch-sobre");
    switchSobre.checked = configs.btnSobre;
    desabilitarSobre(switchSobre)

}

function salvarConfigs(config, valor){
    let configs = JSON.parse(localStorage.getItem('plim-opts')) || {};

    configs[config] = valor;

    localStorage.setItem('plim-opts',JSON.stringify(configs));
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