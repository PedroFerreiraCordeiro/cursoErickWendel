const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL ="invisible"
const MENSAGENS = {
    sucesso:{
        texto: "Combinação Correta",
        classe: "alert-success"
    },
    erro:{
        texto: "Combinação Incorreta",
        classe: "alert-danger"
    }
}
class Tela {

    static obterCodigoHtml(item){
        return `
        <div class="col-md-3">
        <div class="card" style="width: 40%;" onclick = "window.verificarSelecao('${item.id}', '${item.nome}')">
          <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
          </div>
      </div>
      `}
      static configurarBotaoVerificarSelecao(funcaoOnClick){
          window.verificarSelecao = funcaoOnClick
      }
      static alterarConteudoHTML(codigoHtml){
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
      }
      static gerarStringHTMLpelaImagem(itens){
          //para cada item da lista, vai executar a funcao obterCodigoHtml
          // ao final, vai concatenar tudo em uma unica string
          // muda de array para string
          return itens.map(Tela.obterCodigoHtml).join('')
      }
      static atualizarImagens(itens){
          const codigoHtml = Tela.gerarStringHTMLpelaImagem(itens)
          Tela.alterarConteudoHTML(codigoHtml)
      }

      static configurarBotaoJogar(funcaoOnClick) {
          const btnJogar = document.getElementById(ID_BTN_JOGAR)
          btnJogar.onclick = funcaoOnClick
      }
      static exibirHerois(nomeDoHeroi, img){
          const elementosHtml = document.getElementsByName(nomeDoHeroi)
          //para cada elemento encontrado na tela, vamos alterar a imagem
           //para a imagem inicial dele 
           //com o foreach, para cada item dentro dos () setamos o valor de imagem
          elementosHtml.forEach(item => (item.src = img))
      }
      static exibirMensagem(sucesso = true){
          const elemento = document.getElementById(ID_MENSAGEM)
          if(sucesso){
              elemento.classList.remove(MENSAGENS.erro.classe)
              elemento.classList.add(MENSAGENS.sucesso.classe)
              elemento.innerText = MENSAGENS.sucesso.texto
          }
          else{
              elemento.classList.remove(MENSAGENS.sucesso.classe)
              elemento.classList.add(MENSAGENS.erro.classe)
              elemento.innerText = MENSAGENS.erro.texto
          }
          elemento.classList.remove(CLASSE_INVISIVEL)
          
      }
}