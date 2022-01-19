document.addEventListener("DOMContentLoaded",() => {
    const grid = document.querySelector(".grid")
    let quadrados = Array.from(document.querySelectorAll(".grid div"))
    const contadorPontos = document.querySelector("#pontos")
    const botaoStart = document.querySelector("#botao-start")
    const largura = 10
    let proximoEscolha = 0
    let timerId
    let pontos = 0

    const cores = ["orange", "blue", "red", "green", "purple", "yellow", "gray"]


    document.addEventListener("keyup", (e) => {
        if(e.key === "ArrowLeft"){
            andarEsquerda()
            console.log("Mover pra esquerda quando pressiona seta esquerda")
        } else if(e.key === "ArrowRight"){
            andarDireita()
            console.log("Mover pra dreita quando pressiona seta direita")
        }else if(e.key === "ArrowDown"){
            descer()
            console.log("Mover pra baixo quando pressiona seta baixo")
        }else if(e.key === "ArrowUp"){
            rodar()
            console.log("Rotaciona a peça quando a seta para cima é pressionada")
        }
    })


    const pecaLInv = [
        [1, largura+1, largura*2, largura*2+1],
        [largura, largura*2, largura*2+1, largura*2+2],
        [1, largura+1, largura*2+1, 2],
        [largura, largura+1, largura+2, largura*2+2]
    ]
    
    const pecaL = [
        [0, largura, largura*2, largura*2+1],
        [largura, largura+1, largura+2, largura*2],
        [0, 1, largura+1, largura*2+1],
        [largura+2, largura*2, largura*2+1, largura*2+2]
    ]
    
    const pecaS = [
        [largura+1, largura+2,largura*2,largura*2+1],
        [0,largura,largura+1,largura*2+1],
        [largura+1, largura+2,largura*2,largura*2+1],
        [0,largura,largura+1,largura*2+1]
    ]
    
    const pecaZ = [
        [largura,largura+1, largura*2+1, largura*2+2],
        [2, largura+1, largura+2, largura*2+1],
        [largura,largura+1, largura*2+1, largura*2+2],
        [2, largura+1, largura+2, largura*2+1]
    ]
    
    const pecaT = [
        [1,largura,largura+1,largura+2],
        [1,largura+1,largura+2,largura*2+1],
        [largura,largura+1,largura+2,largura*2+1],
        [1,largura,largura+1,largura*2+1]
    ]
    
    const pecaO = [
        [0,1,largura,largura+1],
        [0,1,largura,largura+1],
        [0,1,largura,largura+1],
        [0,1,largura,largura+1]
    ]
    
    const pecaI = [
        [1,largura+1,largura*2+1,largura*3+1],
        [largura,largura+1,largura+2,largura+3],
        [1,largura+1,largura*2+1,largura*3+1],
        [largura,largura+1,largura+2,largura+3]
    ]
    
    const pecas = [pecaL, pecaLInv, pecaT, pecaI, pecaO, pecaZ, pecaS]
    
    let posicaoAtual = 4
    let escolhaPeca = Math.floor(Math.random()*pecas.length)
    let rotacaoAtual = 0
    let pecaAtual = pecas[escolhaPeca][rotacaoAtual]
    
    
    
    const desenhar = () => {
        pecaAtual.forEach(index => {
            quadrados[posicaoAtual+index].classList.add("pecas")
            quadrados[posicaoAtual+index].style.backgroundColor = cores[escolhaPeca]
        })
    }
    
    const desDesenhar = () => {
        pecaAtual.forEach(index => {
            quadrados[posicaoAtual+index].classList.remove("pecas")
            quadrados[posicaoAtual+index].style.backgroundColor = "gainsboro"
        })
    }
    
    const descer = () => {
        desDesenhar()
        posicaoAtual += largura
        desenhar()
        parar()
    }
    
    const parar = () => {
        if(pecaAtual.some(index => quadrados[posicaoAtual + index + largura].classList.contains("ocupado"))) {
            pecaAtual.forEach(index => {quadrados[posicaoAtual+index].classList.add("ocupado")})
            escolhaPeca = proximoEscolha
            proximoEscolha = Math.floor(Math.random()*pecas.length)
            rotacaoAtual = 0
            pecaAtual = pecas[escolhaPeca][rotacaoAtual]            
            posicaoAtual = 4
            desenhar()
            adicionarPonto()            
            mostrarProximo()
            gameOver()
        }
    }
    
    const andarEsquerda = () => {
        desDesenhar()
        const beiraEsquerda = pecaAtual.some(index => (posicaoAtual+index)% largura === 0)
        
        if(!beiraEsquerda){
            posicaoAtual -= 1
        }
        
        if(pecaAtual.some(index => quadrados[posicaoAtual+index].classList.contains("ocupado"))){
            posicaoAtual += 1
        }
        
        desenhar()
    }
    
    const andarDireita = () => {
        desDesenhar()
        const beiraDireita = pecaAtual.some(index => (posicaoAtual+index)% largura === largura - 1)
        
        if(!beiraDireita){
            posicaoAtual += 1
        }
        
        if(pecaAtual.some(index => quadrados[posicaoAtual+index].classList.contains("ocupado"))){
            posicaoAtual -= 1
        }
        
        desenhar()
    }
    
    const rodar = () => {
        desDesenhar()
        rotacaoAtual++
        if(rotacaoAtual === pecaAtual.length){
            rotacaoAtual = 0
        }
        pecaAtual = pecas[escolhaPeca][rotacaoAtual]
        desenhar()
    }  
    
    const proximoGrid = document.querySelectorAll(".mini-grid div")
    const proximoLargura = 4
    let proximoIndex = 0
    
    const proximasPecas = [
        [0, proximoLargura, proximoLargura*2, proximoLargura*2+1],
        [1, proximoLargura+1, proximoLargura*2, proximoLargura*2+1],
        [1,proximoLargura,proximoLargura+1,proximoLargura+2],
        [1,proximoLargura+1,proximoLargura*2+1,proximoLargura*3+1],
        [0,1,proximoLargura,proximoLargura+1],
        [proximoLargura,proximoLargura+1, proximoLargura*2+1, proximoLargura*2+2],
        [proximoLargura+1,  proximoLargura+2,proximoLargura*2,proximoLargura*2+1],
    ]
    
    const mostrarProximo = () => {
        proximoGrid.forEach(quadrado => {
            quadrado.classList.remove("pecas")
            quadrado.style.backgroundColor = ""
        })
        proximasPecas[proximoEscolha].forEach(index=>{
            proximoGrid[proximoIndex+index].classList.add("pecas")
            proximoGrid[proximoIndex + index].style.backgroundColor = cores[proximoEscolha]
        })
    }
  
    botaoStart.addEventListener("click", ()=> {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            desenhar()
            timerId = setInterval(descer, 500);
            proximoEscolha = Math.floor(Math.random()*pecas.length)
            mostrarProximo()
        }
    })  

    const adicionarPonto = () => {
        for (let i = 0; i<199;i+=largura) {
            const linha = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            if(linha.every(index => quadrados[index].classList.contains("ocupado"))){
                pontos += 10
                contadorPontos.innerHTML = pontos
                linha.forEach(index => {quadrados[index].classList.remove('ocupado')
                quadrados[index].classList.remove("pecas")
                quadrados[index].style.backgroundColor = ""
            })
            const removidos = quadrados.splice(i, largura)
            quadrados = removidos.concat(quadrados)
            quadrados.forEach(celula => grid.appendChild(celula))
            }
        }
    }
    
    const gameOver = () => {
        if(pecaAtual.some(index => quadrados[posicaoAtual+index].classList.contains("ocupado"))){
            contadorPontos.innerHTML = `Perdeu. Sua pontuação foi ${pontos} `
            clearInterval(timerId)
        }
    }
    
})