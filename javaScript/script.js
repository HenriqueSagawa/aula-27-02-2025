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
 * Lista de elementos HTML que representam os botões das abas.
 */
const tabs = document.querySelectorAll(".tab_btn");



/**
 * Lista de elementos HTML que representam o conteúdo de cada aba.
 */
const all_content = document.querySelectorAll(".content_tab");



/**
 * Elemento HTML que representa a linha indicadora sob a aba ativa.
 */
var line = document.querySelector(".line");



/**
 * Variável para armazenar o botão da aba atualmente ativa.
 */
var currentButton;




/**
 * Itera sobre cada aba e adiciona um listener para o evento `click`.
 * Ao clicar em uma aba:
 * 1. Remove a classe "active" de todas as abas.
 * 2. Adiciona a classe "active" à aba clicada.
 * 3. Atualiza a largura e a posição da linha indicadora para corresponder à aba clicada.
 * 4. Remove a classe "active" de todos os conteúdos das abas.
 * 5. Adiciona a classe "active" ao conteúdo da aba correspondente ao índice da aba clicada.
 */
tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    tab.classList.add("active");

    currentButton = e.target;

    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    console.log(e.target.offsetWidth + "px");

    all_content.forEach((content) => {
      content.classList.remove("active");
    });
    all_content[index].classList.add("active");
  });
});


/**
 * Adiciona um listener para o evento `resize` na janela.
 * Atualiza a largura e a posição da linha indicadora para corresponder à aba ativa
 * quando a janela é redimensionada.
 */
window.addEventListener("resize", () => {
  line.style.width = currentButton.offsetWidth + "px";
  line.style.left = currentButton.offsetLeft + "px";
});


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
