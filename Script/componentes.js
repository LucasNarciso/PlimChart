class PopupPrincipal {
    constructor(tab1 = "Home") {

        let popup = document.getElementById('Plim-Popup-Principal')
        popup && popup.remove();

        let html = `
            <dialog id="Plim-Popup-Principal" class="active medium modal small-padding small-round plim-flex-column">

                <div class="tabs left-align">
                    <a id="Btn-Pagina-1-PopUp-Principal" class="active" data-ui="#pagina1popup">
                        <i>home</i>
                        <span>${tab1}</span>
                    </a>
                    <a id="Btn-Pagina-2-PopUp-Principal" data-ui="#pagina2popup">
                        <i>person</i>
                        <span>Perfil</span>
                    </a>
                    <a id="Btn-Pagina-3-PopUp-Principal" data-ui="#pagina3popup">
                        <i>settings</i>
                        <span>Configurações</span>
                    </a>
                </div>

                <div class="small-padding plim-flex-column plim-grow">
                    <article class="no-padding small-height transparent page medium-height no-margin plim-flex-column plim-grow active" id="pagina1popup">
                        <div class="plim-flex-column plim-grow">
                            <h5>Página 1</h5>
                            <p>
                                Este é o conteúdo da aba selecionada. O popup utiliza a estrutura padrão
                                do Beer CSS para garantir que os elementos fiquem alinhados e responsivos.
                            </p>
                        </div>

                        <div class="no-space responsive right-align no-padding">
                            <button class="small-round no-margin" data-ui="#pagina2popup">Próximo</button>
                        </div>
                    </article>
                    <article class="no-padding small-height transparent page medium-height no-margin plim-flex-column plim-grow" id="pagina2popup">
                        <div class="plim-flex-column plim-grow">
                            <h5>Página 2</h5>
                            <p>
                                Este é o conteúdo da aba selecionada. O popup utiliza a estrutura padrão
                                do Beer CSS para garantir que os elementos fiquem alinhados e responsivos.
                            </p>
                        </div>
                        <div class="no-space responsive right-align no-padding">
                            <button class="border small-round" data-ui="#pagina1popup">Voltar</button>
                            <button class="small-round no-margin" data-ui="#pagina3popup">Próximo</button>
                        </div>

                    </article>
                    <article class="no-padding small-height transparent page medium-height no-margin plim-flex-column plim-grow" id="pagina3popup">
                        <div class="plim-flex-column plim-grow">
                            <h5>Página 3</h5>
                            <p>
                                Este é o conteúdo da aba selecionada. O popup utiliza a estrutura padrão
                                do Beer CSS para garantir que os elementos fiquem alinhados e responsivos.
                            </p>
                        </div>
                        <div class="no-space responsive right-align no-padding">
                            <button class="border small-round" data-ui="#pagina2popup">Voltar</button>
                            <button class="small-round no-margin" data-ui="#Plim-Popup-Principal">Concluir</button>
                        </div>

                    </article>
                </div>
            </dialog>
        `

        document.body.insertAdjacentHTML('beforeEnd',html)
    }

    fechar(){
        document.getElementById('Plim-Popup-Principal').classList.remove('active')
    }
}