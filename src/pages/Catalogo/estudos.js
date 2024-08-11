function buscarOsTemas() {
    fetch('data.json')          //Buscar o .json
        .then(response => response.json())          // se achar o .json pega a resposta
        .then(data => {         //se a resposta for data (porque não vai vim data.json e sim data) ele segue
            const buscarCaixaDeTema = document.querySelector("#temas")          //busca a section onde fica os "card"

            data.map(tema => {          //.map busca dentro do .json cada objeto, o tema pode mudar é tipo variavel
                const cardTema = document.createElement("div")
                cardTema.classList.add("estudos-ref")

                const cardImg = document.createElement("img")
                cardImg.src = tema.icone            //tema.(o atributo do objeto no json)
                cardImg.alt = tema.iconedescricao           //tema.(o atributo do objeto no json)

                const cardDiv = document.createElement("div")
                cardDiv.classList.add("colorbk")

                const cardTitulo = document.createElement("h3")
                cardTitulo.textContent = tema.titulo            //tema.(o atributo do objeto no json)

                const cardDescricao = document.createElement("p")
                cardDescricao.textContent = tema.descricao          //tema.(o atributo do objeto no json)

                buscarCaixaDeTema.appendChild(cardTema)         //transforma o cardTema no "filho" da section

                cardTema.appendChild(cardImg)           //transforma o cardImg no "filho" da cardTema
                cardTema.appendChild(cardDiv)           //transforma o cardDiv no "filho" da cardTema

                cardDiv.appendChild(cardTitulo)         //transforma o cardTitulo no "filho" da cardDiv
                cardDiv.appendChild(cardDescricao)         //transforma o cardDescricao no "filho" da cardDiv
            })
        })

}

buscarOsTemas()