    class JogoDaMemoria {
    // se mandar um objeto = {tela: 1, idade: 2, etc: 3}
    // vai ignorar o resto das propriedades e pegar somente a propriedade
    // tela
    constructor({tela, util}){
        this.tela = tela
        this.util = util
        // caminho do arquivo, sempre relativo ao index html
        this.heroisIniciais =[
            {
                img: './arquivos/batman.png',
                nome: 'batman'
            },
            {
                img: './arquivos/deadpool.png',
                nome: 'deadpool'
            },
            {
                img: './arquivos/flash.png',
                nome: 'flash'
            },
            {
                img: './arquivos/wolwerine.png',
                nome: 'wolwerine'
            }
        ]

        this.iconePadrao = './arquivos/ninja.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }
    //para usar o this, não podemos usar static!
    inicializar(){
        //vai pegar todas as funcoes da classe tela!
        //coloca todos herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
    }
   async embaralhar(){
        const copias = this.heroisIniciais
        //duplicar os itens
        .concat(this.heroisIniciais)
        .map(item =>{
            return Object.assign({}, item, { id: Math.random() / 0.5})
        })
        
        //ORDENAR
        .sort(()=> Math.random() - 0.5)
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()
        const idDoIntervalo = this.tela.iniciarContador()

      await this.util.timeout(3000)
            this.esconderHerois(copias)
            this.tela.exibirCarregando(false)
       

    }
    esconderHerois(herois){
        //vamos trocar a imagem de todos os herois existentes
        //pelo icone padrão
        //como fiz no construtor vamos extrair somente o necessario
        const heroisOcultos = herois.map(({nome, id})=> ({
            id,
            nome,
            img: this.iconePadrao
        }))
        this.tela.atualizarImagens(heroisOcultos)
        this.heroisEscondidos = heroisOcultos

    }
    exibirHerois(nomeDoHeroi){
        const {img} = this.heroisIniciais.find(({nome}) => nomeDoHeroi === nome)
        this.tela.exibirHerois(nomeDoHeroi, img)
    }

    verificarSelecao(id, nome){
        const item = {id, nome}
       // alert(`Olá: ${item.id}, ${item.nome} `)
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados){
            case 0:
                //adiciona a escolha na lista, esperando pela proxima clickada
                this.heroisSelecionados.push(item)
                break;
            case 1:
                //se a quantidade de escolhido for 1, significa que o usuario so pode escolher mais um
                const [opcao1] = this.heroisSelecionados
                //zerar itens para nao selecionar mais de dois
                this.heroisSelecionados = []
                if(opcao1.nome === item.nome && opcao1.id !== item.id ){
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem()
                    return;
                }
                    this.tela.exibirMensagem(false)
                alert('combinacao incorreta!')
                break;
        }

    }
    mostrarHeroisEscondidos(){
        const heroisEscondidos = this.heroisEscondidos
        for(const heroi of heroisEscondidos){
            const {img}= this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.img= img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }

    jogar(){
        this.embaralhar()
    }

    
        
    }