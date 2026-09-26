(function () {
  var root = document.documentElement;
  root.classList.add("js");

  var reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduzido && "IntersectionObserver" in window) {
    var revelar = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("visivel");
        revelar.unobserve(entrada.target);
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".revelar").forEach(function (item) {
      revelar.observe(item);
    });
  }

  var pares = [];
  document.querySelectorAll(".menu a[href^='#']").forEach(function (link) {
    var secao = document.querySelector(link.getAttribute("href"));
    if (secao) pares.push({ link: link, secao: secao });
  });
  if (pares.length && "IntersectionObserver" in window) {
  var atual = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      pares.forEach(function (par) {
        var ativo = par.secao === entrada.target;
        par.link.classList.toggle("ativo", ativo);
        if (ativo) par.link.setAttribute("aria-current", "true");
        else par.link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -45% 0px" });

  pares.forEach(function (par) {
    atual.observe(par.secao);
  });
  }

  document.querySelectorAll("[data-carrossel]").forEach(function (carrossel) {
    var janela = carrossel.querySelector(".carrossel-janela");
    var slides = carrossel.querySelectorAll(".case");
    var status = carrossel.querySelector("[data-carrossel-status]");
    var anterior = carrossel.querySelector("[data-carrossel-anterior]");
    var proximo = carrossel.querySelector("[data-carrossel-proximo]");
    if (!janela || !slides.length || !anterior || !proximo) return;

    function indiceAtual() {
      var largura = janela.clientWidth || 1;
      return Math.max(0, Math.min(slides.length - 1, Math.round(janela.scrollLeft / largura)));
    }

    function atualizar() {
      var indice = indiceAtual();
      if (status) status.textContent = (indice + 1) + " de " + slides.length;
      anterior.disabled = indice <= 0;
      proximo.disabled = indice >= slides.length - 1;
    }

    function ir(indice) {
      var destino = slides[indice];
      if (!destino) return;
      var suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      janela.scrollTo({ left: destino.offsetLeft, behavior: suave ? "smooth" : "auto" });
    }

    anterior.addEventListener("click", function () {
      ir(indiceAtual() - 1);
    });
    proximo.addEventListener("click", function () {
      ir(indiceAtual() + 1);
    });
    janela.addEventListener("scroll", atualizar);
    atualizar();
  });

  var formulario = document.querySelector("form[name='contato']");
  if (formulario) {
    var confirmacao = document.querySelector("[data-envio-ok]");
    var erro = formulario.querySelector("[data-envio-erro]");

    function mostrarConfirmacao() {
      formulario.classList.add("enviado");
      formulario.querySelectorAll("input, textarea, button").forEach(function (campo) {
        if (campo.name === "form-name" || campo.name === "bot-field") return;
        campo.disabled = true;
      });
      if (confirmacao) confirmacao.setAttribute("aria-hidden", "false");
    }

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      if (erro) erro.hidden = true;
      var botao = formulario.querySelector("[type='submit']");
      if (botao) botao.disabled = true;
      var corpo = new URLSearchParams(new FormData(formulario));
      corpo.set("form-name", "contato");
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: corpo.toString()
      }).then(function (resposta) {
        if (resposta.status !== 200 && resposta.status !== 302) throw new Error("envio");
        mostrarConfirmacao();
      }).catch(function () {
        if (botao) botao.disabled = false;
        if (erro) erro.hidden = false;
      });
    });
  }
})();
