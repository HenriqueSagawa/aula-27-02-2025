/**
 * Elemento HTML que contém o texto detalhado sobre os produtos.
 */
const text = document.querySelector(".text");

/**
 * Função para exibir ou ocultar o elemento `text`.
 * Alterna a propriedade `display` entre "block" e "none".
 */
function view() {
    if (text.style.display === "block") {
        text.style.display = "none";
    } else {
        text.style.display = "block";
    }
}

/**
 * Adiciona um listener para o evento `keydown` no documento.
 * Se a tecla pressionada for "Escape", oculta o elemento `text`.
 */
document.onkeydown = function (event) {
    if (event.key === "Escape") {
        text.style.display = "none";
    }
};

/**
 * Lista de elementos HTML que representam os itens do dropdown na navegação.
 */
const dropdownItems = document.querySelectorAll("nav ul li");

/**
 * Itera sobre cada item do dropdown e adiciona um listener para o evento `click` no botão do dropdown.
 * Ao clicar no botão do dropdown:
 * 1. Remove a classe "active" de todos os outros itens do dropdown que estão ativos.
 * 2. Alterna a classe "active" no item do dropdown clicado.
 */
dropdownItems.forEach((item) => {
    const button = item.querySelector("img");
    const dropdownContent = item.querySelector("p");

    button.addEventListener("click", () => {
        dropdownItems.forEach((dropdown) => {
            if (dropdown !== item && dropdown.classList.contains("active")) {
                dropdown.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});

/**
 * Adiciona um listener para o evento `click` no documento.
 * Se o clique for fora de um item do dropdown, remove a classe "active" de todos os itens do dropdown.
 */
document.addEventListener("click", function (event) {
    const dropdownItems = document.querySelectorAll("nav ul li");
    const target = event.target;

    let insideDropdown = false;
    dropdownItems.forEach((item) => {
        if (item.contains(target)) {
            insideDropdown = true;
        }
    });

    if (!insideDropdown) {
        dropdownItems.forEach((item) => {
            item.classList.remove("active");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const produtos = [
        { nome: "Amstel", descricao: "Lorem ipsum dolor sit amet..." },
        { nome: "Brahma", descricao: "Lorem ipsum dolor sit amet..." },
        { nome: "Dankel", descricao: "Lorem ipsum dolor sit amet..." },
        { nome: "Heineken", descricao: "Lorem ipsum dolor sit amet..." },
    ];

    const cardsContainer = document.getElementById("cards-container");
    const tabBoxContainer = document.getElementById("tab-box-container");
    const contentBoxContainer = document.getElementById("content-box-container");

    // Função para criar os cards de produtos
    function criarCards() {
        let cardsHTML = "";
        produtos.forEach((produto) => {
            cardsHTML += `
            <div class="card">
              <span></span>
              <div class="content">
                <h1>${produto.nome}</h1>
                <button onclick="view()">Leia mais...</button>
              </div>
            </div>
          `;
        });
        cardsContainer.innerHTML = cardsHTML;
    }

    // Função para criar as abas de produtos
    function criarAbas() {
        let abasHTML = "";

        for (let i = 0; i < produtos.length; i++) {
            abasHTML += `<button class="tab_btn">${produtos[i].nome}</button>`;
        }

        abasHTML += `<div class="line"></div>`;
        tabBoxContainer.innerHTML = abasHTML;
    }

    // Função para criar o conteúdo das abas
    function criarConteudoAbas() {
        let conteudoAbasHTML = "";

        for (let i = 0; i < produtos.length; i++) {
            conteudoAbasHTML += `
          <div class="content_tab">
            <h2>${produtos[i].nome}</h2>
            <p>${produtos[i].descricao}</p>
          </div>
      `;
        }

        contentBoxContainer.innerHTML = conteudoAbasHTML;
    }

    // Adiciona interatividade às abas
    function setupAbas() {
        const tabButtons = document.querySelectorAll(".tab_btn");
        const contentTabs = document.querySelectorAll(".content_tab");
        const line = document.querySelector(".line"); // Puxa a linha aqui

        // Garante que pelo menos uma aba esteja ativa inicialmente
        if (tabButtons.length > 0) {
            tabButtons[0].classList.add("active");
            contentTabs[0].classList.add("active");
            line.style.width = tabButtons[0].offsetWidth + "px";
            line.style.left = tabButtons[0].offsetLeft + "px";
        }

        tabButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                // Remove a classe 'active' de todos os botões e conteúdos
                tabButtons.forEach((btn) => btn.classList.remove("active"));
                contentTabs.forEach((tab) => tab.classList.remove("active"));

                // Adiciona a classe 'active' ao botão e conteúdo correspondentes
                button.classList.add("active");
                contentTabs[index].classList.add("active");

                // Atualiza a posição da linha
                line.style.width = button.offsetWidth + "px";
                line.style.left = button.offsetLeft + "px";
            });
        });
    }

    // Chamar as funções para injetar o HTML
    criarCards();
    criarAbas();
    criarConteudoAbas();

    // Inicializa a interatividade das abas (DEPOIS de criar as abas)
    setupAbas();
});

/**
 * Adiciona um listener para o evento `resize` na janela.
 * Atualiza a largura e a posição da linha indicadora para corresponder à aba ativa
 * quando a janela é redimensionada.
 */
window.addEventListener("resize", () => {
    const activeTab = document.querySelector(".tab_btn.active");
    if (activeTab) {
        const line = document.querySelector(".line");
        line.style.width = activeTab.offsetWidth + "px";
        line.style.left = activeTab.offsetLeft + "px";
    }
});