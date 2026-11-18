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
    var campos = formulario.querySelector("[data-envio-campos]");
    var confirmacao = formulario.querySelector("[data-envio-ok]");
    var resumo = formulario.querySelector("[data-envio-resumo]");
    var erro = formulario.querySelector("[data-envio-erro]");
    var botao = formulario.querySelector("[type='submit']");
    var textoBotao = botao ? botao.textContent : "";
    var whatsapp = formulario.querySelector("#whatsapp");
    var ddds = {
      "11": 1, "12": 1, "13": 1, "14": 1, "15": 1, "16": 1, "17": 1, "18": 1, "19": 1,
      "21": 1, "22": 1, "24": 1, "27": 1, "28": 1,
      "31": 1, "32": 1, "33": 1, "34": 1, "35": 1, "37": 1, "38": 1,
      "41": 1, "42": 1, "43": 1, "44": 1, "45": 1, "46": 1, "47": 1, "48": 1, "49": 1,
      "51": 1, "53": 1, "54": 1, "55": 1,
      "61": 1, "62": 1, "64": 1, "63": 1, "65": 1, "66": 1, "67": 1, "68": 1, "69": 1,
      "71": 1, "73": 1, "74": 1, "75": 1, "77": 1, "79": 1,
      "81": 1, "82": 1, "83": 1, "84": 1, "85": 1, "86": 1, "87": 1, "88": 1, "89": 1,
      "91": 1, "92": 1, "93": 1, "94": 1, "95": 1, "96": 1, "97": 1, "98": 1, "99": 1
    };

    function textoLimpo(valor) {
      return valor.trim().replace(/\s+/g, " ");
    }

    function digitosWhatsapp(valor) {
      var digitos = valor.replace(/\D/g, "");
      if (digitos.indexOf("55") === 0 && digitos.length > 11) digitos = digitos.slice(2);
      return digitos.slice(0, 11);
    }

    function formatarWhatsapp(valor) {
      var digitos = digitosWhatsapp(valor);
      if (!digitos) return "";
      if (digitos.length === 1) return "(" + digitos;
      var ddd = digitos.slice(0, 2);
      var resto = digitos.slice(2);
      if (!resto) return "(" + ddd + ") ";
      if (resto.charAt(0) === "9") {
        var movel = resto.slice(0, 5);
        var fimMovel = resto.slice(5, 9);
        return "(" + ddd + ") " + movel + (fimMovel ? "-" + fimMovel : "");
      }
      if (resto.length <= 4) return "(" + ddd + ") " + resto;
      return "(" + ddd + ") " + resto.slice(0, 4) + "-" + resto.slice(4, 8);
    }

    function aplicarWhatsapp() {
      if (!whatsapp) return;
      var antes = whatsapp.value;
      var posicao = whatsapp.selectionStart || 0;
      var digitosAteCursor = (antes.slice(0, posicao).match(/\d/g) || []).length;
      var formatado = formatarWhatsapp(antes);
      whatsapp.value = formatado;
      var vistos = 0;
      var novaPosicao = formatado.length;
      for (var i = 0; i < formatado.length; i++) {
        if (/\d/.test(formatado.charAt(i))) vistos += 1;
        if (vistos >= digitosAteCursor) {
          novaPosicao = i + 1;
          break;
        }
      }
      if (document.activeElement === whatsapp && whatsapp.setSelectionRange) {
        whatsapp.setSelectionRange(novaPosicao, novaPosicao);
      }
    }

    function nomeValido(valor) {
      return valor.length >= 2 && valor.length <= 120 && /^[\p{L}][\p{L}'’. -]{1,119}$/u.test(valor);
    }

    function emailValido(valor) {
      if (valor.length < 6 || valor.length > 254) return false;
      if (valor.indexOf("..") !== -1) return false;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) return false;
      var partes = valor.split("@");
      return partes[0].charAt(0) !== "." && partes[0].charAt(partes[0].length - 1) !== ".";
    }

    function organizacaoValida(valor) {
      if (!valor) return true;
      return valor.length >= 2 && valor.length <= 160 && /[\p{L}\p{N}]/u.test(valor);
    }

    function whatsappValido(valor) {
      if (!valor) return true;
      var digitos = digitosWhatsapp(valor);
      if (!ddds[digitos.slice(0, 2)]) return false;
      if (digitos.length === 11) return digitos.charAt(2) === "9";
      if (digitos.length === 10) {
        var primeiro = digitos.charAt(2);
        return primeiro >= "2" && primeiro <= "5";
      }
      return false;
    }

    function mostrarErro(id, campo, mensagem) {
      var aviso = document.getElementById(id);
      if (campo) campo.setAttribute("aria-invalid", "true");
      if (aviso) {
        aviso.hidden = false;
        aviso.textContent = mensagem;
      }
    }

    function limparErro(id, campo) {
      var aviso = document.getElementById(id);
      if (campo) campo.removeAttribute("aria-invalid");
      if (aviso) {
        aviso.hidden = true;
        aviso.textContent = "";
      }
    }

    function focarCampo(campo) {
      if (!campo) return;
      if (campo.matches && campo.matches("fieldset")) {
        var radio = campo.querySelector("input");
        if (radio) radio.focus();
        return;
      }
      if (campo.focus) campo.focus();
    }

    function validarCampo(nomeCampo) {
      if (nomeCampo === "nome") {
        var nome = formulario.querySelector("#nome");
        nome.value = textoLimpo(nome.value);
        if (nomeValido(nome.value)) {
          limparErro("erro-nome", nome);
          return { ok: true };
        }
        mostrarErro("erro-nome", nome, "Escreva seu nome.");
        return { ok: false, foco: nome };
      }
      if (nomeCampo === "email") {
        var email = formulario.querySelector("#email");
        email.value = textoLimpo(email.value);
        if (emailValido(email.value)) {
          limparErro("erro-email", email);
          return { ok: true };
        }
        mostrarErro("erro-email", email, "Use um e-mail válido, como nome@empresa.com.");
        return { ok: false, foco: email };
      }
      if (nomeCampo === "perfil") {
        var perfil = formulario.querySelector("fieldset");
        var perfilMarcado = formulario.querySelector("input[name='perfil']:checked");
        if (perfilMarcado) {
          limparErro("erro-perfil", perfil);
          return { ok: true };
        }
        mostrarErro("erro-perfil", perfil, "Escolha um perfil.");
        return { ok: false, foco: perfil };
      }
      if (nomeCampo === "organizacao") {
        var organizacao = formulario.querySelector("#organizacao");
        organizacao.value = textoLimpo(organizacao.value);
        if (organizacaoValida(organizacao.value)) {
          limparErro("erro-organizacao", organizacao);
          return { ok: true };
        }
        mostrarErro("erro-organizacao", organizacao, "Escreva o nome da organização.");
        return { ok: false, foco: organizacao };
      }
      if (nomeCampo === "whatsapp") {
        if (!whatsapp) return { ok: true };
        whatsapp.value = formatarWhatsapp(whatsapp.value);
        if (whatsappValido(whatsapp.value)) {
          limparErro("erro-whatsapp", whatsapp);
          return { ok: true };
        }
        mostrarErro("erro-whatsapp", whatsapp, "Use o WhatsApp com DDD, como (86) 99999-9999.");
        return { ok: false, foco: whatsapp };
      }
      if (nomeCampo === "mensagem") {
        var mensagem = formulario.querySelector("#mensagem");
        mensagem.value = textoLimpo(mensagem.value);
        if (mensagem.value.length >= 8 && mensagem.value.length <= 2000) {
          limparErro("erro-mensagem", mensagem);
          return { ok: true };
        }
        mostrarErro("erro-mensagem", mensagem, "Descreva a necessidade em poucas palavras.");
        return { ok: false, foco: mensagem };
      }
      return { ok: true };
    }

    function validar() {
      var ordem = ["nome", "email", "perfil", "organizacao", "whatsapp", "mensagem"];
      var primeiro = null;
      ordem.forEach(function (nomeCampo) {
        var resultado = validarCampo(nomeCampo);
        if (!resultado.ok && !primeiro) primeiro = resultado.foco;
      });
      if (primeiro) focarCampo(primeiro);
      return !primeiro;
    }

    if (whatsapp) {
      whatsapp.addEventListener("input", function () {
        aplicarWhatsapp();
        if (whatsapp.getAttribute("aria-invalid") === "true" && whatsappValido(whatsapp.value)) {
          limparErro("erro-whatsapp", whatsapp);
        }
      });
    }

    formulario.addEventListener("focusout", function (evento) {
      var alvo = evento.target;
      if (!alvo || !alvo.name || alvo.name === "bot-field" || alvo.name === "form-name") return;
      if (alvo.name === "perfil") {
        var grupo = formulario.querySelector("fieldset");
        if (evento.relatedTarget && grupo && grupo.contains(evento.relatedTarget)) return;
      }
      validarCampo(alvo.name);
    });

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      if (erro) erro.hidden = true;
      if (!validar()) return;
      if (botao) {
        botao.disabled = true;
        botao.textContent = "Enviando…";
      }
      var emailEnviado = formulario.querySelector("#email").value;
      var corpo = new URLSearchParams(new FormData(formulario));
      corpo.set("form-name", "contato");
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: corpo.toString()
      }).then(function (resposta) {
        if (resposta.status !== 200 && resposta.status !== 302) throw new Error("envio");
        if (campos) campos.hidden = true;
        if (resumo) {
          resumo.textContent = "Recebemos a sua mensagem. Vamos ler o contexto e responder para " + emailEnviado + ".";
        }
        if (confirmacao) {
          confirmacao.hidden = false;
          confirmacao.focus();
        }
      }).catch(function () {
        if (botao) {
          botao.disabled = false;
          botao.textContent = textoBotao;
        }
        if (erro) erro.hidden = false;
      });
    });
  }
})();
