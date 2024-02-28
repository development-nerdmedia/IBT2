/*
$("section.tabs").stick_in_parent({
  offset_top: 0,
  offset_right: 52,
});
*/

MyApp = {
  loadingPrincipal: {
    init: function () {
      document.querySelector("body").classList.add("scrollHidden");
      setTimeout(() => {
        document.querySelector(".loading").classList.add("active");
        setTimeout(() => {
          document.querySelector(".loading").classList.add("ocultar");
          setTimeout(() => {
            document.querySelector("body").classList.remove("scrollHidden");
            AOS.init();
          }, 1500);
        }, 1500);
      }, 500);
    }
  },
  fondoHomeSticky: {
    init: function () {
      $("section.home .fondo").stick_in_parent({
        offset_top: 0,
        offset_right: 52,
      });

      var content = document.querySelector("section.home");
      var imgElement = document.querySelector(".animacion");

      var sticky = gsap.timeline({
        scrollTrigger: {
          //markers: true,
          trigger: content,
          start: '0% 0%',
          end: '80% 50%',
          scrub: true,
        },
      });
      sticky.to(imgElement, { "clip-path": "inset(0%)" })

    }
  },
  swiperNegocios: {
    init: function () {
      var swiper = new Swiper(".swiperNegocios", {
        slidesPerView: 4.29,
        spaceBetween: 30,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiperNegocios .swiper-pagination",
          dynamicBullets: true,
        },
        loop: true,
        breakpoints: {
          1601: {
            slidesPerView: 4.29,
          },
          1441: {
            slidesPerView: 3.5,
          },
          1281: {
            slidesPerView: 3.12,
          },
          1025: {
            slidesPerView: 2.6,
          },
          851: {
            slidesPerView: 2.4,
            spaceBetween: 30,
          },
          769: {
            slidesPerView: 2.15,
            spaceBetween: 30,
          },
          651: {
            slidesPerView: 1.9,
            spaceBetween: 30,
          },
          600: {
            slidesPerView: 1.6,
            spaceBetween: 30,
          },
          381: {
            slidesPerView: 1.38,
            spaceBetween: 25,
          },
          0: {
            slidesPerView: 1.07,
            spaceBetween: 25,
          },
        },
      });
      $('.swiperNegocios').on('mouseenter', function () {
        swiper.autoplay.stop();
      });

      $('.swiperNegocios').on('mouseleave', function () {
        swiper.autoplay.start();
      });
    }
  },
  /* nuevo */
  swiperHome: {
    init: function () {
      var swiper = new Swiper(".swiperHome", {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: "section.home .swiper-button-next",
          prevEl: "section.home .swiper-button-prev",
        },
        pagination: {
          el: "section.home .swiper-pagination",
          clickable: true,
        },

        on: {
          init: function () {
            setTimeout(() => {
              var activeSlide = swiper.slides[swiper.activeIndex];
              var activeVideo = activeSlide.querySelector('video');

              if (activeVideo) {
                activeVideo.play();
              }

            }, 2000);
            console.log('swiper initialized');
          },

          slideChange: function () {
            var allVideos = document.querySelectorAll('video');
            allVideos.forEach(function (video) {
              video.currentTime = 0;
              video.pause();
              video.muted = true;
            });

            var activeSlide = swiper.slides[swiper.activeIndex];
            var activeVideo = activeSlide.querySelector('video');
            if (activeVideo) {
              activeVideo.play();
            }
          }
        }
      });

      const slides = document.querySelectorAll('section.home .swiper-slide');

      // Iterar sobre cada diapositiva
      slides.forEach(slide => {
        // Obtener el video y el botón dentro de la diapositiva actual
        const video = slide.querySelector('video');
        const unmuteBtn = slide.querySelector('.sound-button');

        // Agregar un evento de clic al botón
        unmuteBtn.addEventListener('click', function () {
          // Alternar entre mutear y desmutear el video al hacer clic en el botón
          video.muted = !video.muted;
          unmuteBtn.classList.toggle('open', !video.muted);
          // Actualizar el texto del botón según el estado del video
          //unmuteBtn.textContent = video.muted ? 'Desmutear' : 'Mutar';
        });
      });

    }
  },
  /* end nuevo */
  imgStickyProyectoInterna: {
    init: function () {
      $(".proyectosInterna .part2 .img").stick_in_parent({
        offset_top: 0,
        offset_right: 52,
      });
    }
  },
  menuDinamico: {
    init: function () {
      var header = document.querySelector('header');
      var headerClass = 'hLTFFw';
      var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;

      function handleScroll() {
        var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
        var isAtTop = currentScrollPos === 0;
        var isScrollingUp = prevScrollPos > currentScrollPos;

        if (isAtTop) {
          headerClass = 'hLTFFw';
        } else if (isScrollingUp) {
          headerClass = 'leoCdG';
        } else {
          headerClass = 'bVLcxx';
        }

        header.className = headerClass;
        prevScrollPos = currentScrollPos;
      }

      window.addEventListener('scroll', handleScroll);
    }
  },
  categorias: {
    init: function () {
      document.querySelector(".categorias li").classList.add("select");
      let listaTitle = [];
      const enlaces = document.querySelectorAll('.categorias li');//original
      for (let i = 0; i < enlaces.length; i++) {
        textoitem = enlaces[i].textContent.toLowerCase().replace(/(\r\n|\n|\r| )/gm, "").trimStart().trimEnd();
        listaTitle.push(textoitem);
      }

      $('.itemArticulo').hide();
      const categoryMainoff = document.querySelector('.categorias li.select')
      const categoryMain = categoryMainoff.getAttribute("data-categoria");
      if (categoryMain === "Todos") {
        $(`.itemArticulo.modulo-mas`).hide();
        $(`.itemArticulo.modulo-mas`).slice(0, 6).show(0);
        conditionTodos = $(`.itemArticulo.modulo-mas`);
        $("#cargarMasModulo").attr("style", "display:flex;");
        if (conditionTodos.length <= 6) {
          $("#cargarMasModulo").attr("style", "display:none;");
        } else {
          $("#cargarMasModulo").attr("style", "display:flex;");
        }
      } else {
        $(`.itemArticulo.modulo-mas[data-categoria="${categoryMain}"]`).slice(0, 6).show(0);
      }

      enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
          evento.preventDefault();
          enlaces.forEach((enlace) => enlace.classList.remove('select'));
          evento.target.classList.add('select');
          var categoria = evento.target.getAttribute("data-categoria");
          $("#cargarMasModulo").attr("style", "display:flex;");
          if (categoria === "Todos") {
            $(`.itemArticulo.modulo-mas`).hide();
            $(`.itemArticulo.modulo-mas`).slice(0, 6).show(0);
            conditionTodos = $(`.itemArticulo.modulo-mas`);
            if (conditionTodos.length <= 6) {
              $("#cargarMasModulo").attr("style", "display:none;");
            } else {
              $("#cargarMasModulo").attr("style", "display:flex;");
            }
          } else {
            $(`.itemArticulo`).hide();
            $(`.itemArticulo`).not(`[data-categoria="${categoria}"]`).hide();
            $(`.itemArticulo.modulo-mas[data-categoria="${categoria}"]`).slice(0, 6).show(0);
            condition6 = $(`.itemArticulo.modulo-mas[data-categoria="${categoria}"]`);
            if (condition6.length <= 6) {
              $("#cargarMasModulo").attr("style", "display:none;");
            } else {
              $("#cargarMasModulo").attr("style", "display:flex;");
            }
          }
        });
      });

      var nameCategory = $(`.itemArticulo[data-categoria="${categoryMain}"]`).attr("data-categoria");
      var select = $(`#categoryPortfolio`)
      $("#categoryPortfolio").val(`${nameCategory}`)

      if (categoryMain === "Todos") {
        condition6 = $(`.itemArticulo.modulo-mas`);
        if (condition6.length <= 6) {
          $("#cargarMasModulo").attr("style", "display:none;");
        } else {
          $("#cargarMasModulo").attr("style", "display:flex;");
        }
      } else {
        condition6 = $(`.itemArticulo.modulo-mas[data-categoria="${categoryMain}"]`);
        if (condition6.length <= 6) {
          $("#cargarMasModulo").attr("style", "display:none;");
        } else {
          $("#cargarMasModulo").attr("style", "display:flex;");
        }
      }


      $("#cargarMasModulo").click(function (e) {
        e.preventDefault();
        const categoryMain2 = document.querySelector('.categorias li.select').getAttribute("data-categoria");
        if (categoryMain2 === "Todos") {
          $(`.modulo-mas:hidden`).slice(0, 6).slideDown(0);
          if ($(`.modulo-mas:hidden`).length == 0) {
            $("#cargarMasModulo").attr("style", "display:none;");
          }
        } else {
          $(`.modulo-mas[data-categoria="${categoryMain2}"]:hidden`).slice(0, 6).slideDown(0);
          if ($(`.modulo-mas[data-categoria="${categoryMain2}"]:hidden`).length == 0) {
            $("#cargarMasModulo").attr("style", "display:none;");
          }
        }
      });

    }
  },
  sliderBlog: {
    init: function () {
      var swiper = new Swiper(".sliderNoticias", {
        slidesPerView: 3.3,
        spaceBetween: 30,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        loop: true,
        navigation: {
          nextEl: ".noticiasRelacionadas .flechas .swiper-button-next",
          prevEl: ".noticiasRelacionadas .flechas .swiper-button-prev",
        },
        pagination: {
          el: ".noticiasRelacionadas .swiper-pagination",
          dynamicBullets: true,
        },
        breakpoints: {
          1441: {
            slidesPerView: 3.3,
            spaceBetween: 30,
          },
          1281: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1180: {
            slidesPerView: 2.9,
            spaceBetween: 25,
          },
          1025: {
            slidesPerView: 2.6,
            spaceBetween: 25,
          },
          851: {
            slidesPerView: 2.48,
            spaceBetween: 25,
          },
          769: {
            slidesPerView: 2.2,
            spaceBetween: 25,
          },
          650: {
            slidesPerView: 1.75,
            spaceBetween: 25,
          },
          501: {
            slidesPerView: 1.3,
            spaceBetween: 25,
          },
          381: {
            slidesPerView: 1.15,
            spaceBetween: 25,
          },
          0: {
            slidesPerView: 1.05,
            spaceBetween: 25,
          },
        },
      });
      $('.sliderNoticias').on('mouseenter', function () {
        swiper.autoplay.stop();
      });

      $('.sliderNoticias').on('mouseleave', function () {
        swiper.autoplay.start();
      });
    }
  },
  tabsOficina: {
    init: function () {

      document.querySelector(".cabecera").closest(".itemTab").classList.add("open");
      const firstTab = document.querySelector("section.oficinas .part2 .itemTab .mapa .iframe").innerHTML;
      const fondoElement = document.querySelector("section.oficinas .part1 .img .fondo");
      fondoElement.innerHTML = firstTab;

      const cabeceras = document.querySelectorAll('.cabecera');

      cabeceras.forEach(cabecera => {
        cabecera.addEventListener('click', () => {
          const itemTabs = document.querySelectorAll('.itemTab');
          itemTabs.forEach(itemTab => {
            itemTab.classList.remove('open');
          });
          cabecera.parentElement.classList.add('open');

          const mapaElement = cabecera.parentElement.querySelector('.mapa .iframe');
          if (mapaElement) {
            fondoElement.innerHTML = mapaElement.innerHTML;
          }
        })
      });

      $(".oficinas .part1 .img").stick_in_parent({
        offset_top: 100,
        offset_right: 52,
      });
    }
  },
  validate: {
    init: function () {
      $(document).on("wheel", "input[type=number]", function (e) { $(this).blur(); });
      var formespacioinput = document.querySelectorAll('.form-input.required');
      var inputPoliticas = document.querySelector('input#politicas');

      function validateInput(e) {
        for (let y = 0; y < formespacioinput.length; y++) {
          if (!formespacioinput[y].value) {
            formespacioinput[y].classList.add("error");
            e.preventDefault();
          } else {
            formespacioinput[y].classList.remove("error");
          }
        }
      }

      function validateInputCorreo(e) {
        var inputCorreo = document.querySelector('input[type=email]');
        var valueCorreo = inputCorreo.value;
        if (valueCorreo.includes("@") && (valueCorreo.includes(".com") || valueCorreo.includes(".pe") || valueCorreo.includes(".gob") || valueCorreo.includes(".net") || valueCorreo.includes(".org") || valueCorreo.includes(".edu") || valueCorreo.includes(".gov") || valueCorreo.includes(".mil"))) {
          inputCorreo.classList.remove("error");
        } else {
          inputCorreo.classList.add("error");
          e.preventDefault();
        }
      }

      function validateInputPoliticas(e) {
        if (!inputPoliticas.ckecked) {
          inputPoliticas.classList.add("error");
        } else {
          inputPoliticas.classList.remove("error");
        }
      }

      document.addEventListener("click", function (e) {
        if (e.target.closest("form button")) {
          validateInput(e)
          validateInputCorreo(e)
          validateInputPoliticas(e)
        }
      })
    }
  },
  desplegable: {
    init: function () {
      document.addEventListener("click", function (e) {
        if (e.target.closest("footer .desplegable .title")) {
          e.target.closest('.desplegable').classList.toggle("open");
          $('html, body').animate({ scrollTop: $(document).height() }, 0);
        }
      })
    }
  },
  listaMovil: {
    init: function () {

      const lista = document.querySelector('section.proyectosInterna .part1 ul');
      const botonMostrarMas = document.querySelector('section.proyectosInterna .part1 button');
      const elementosLi = lista.getElementsByTagName('li');

      if (elementosLi.length > 5) {
        botonMostrarMas.style.display = 'flex';
      }

      for (let i = 0; i < elementosLi.length; i++) {
        if (i >= 5) {
          elementosLi[i].style.display = 'none';
        }
      }

      botonMostrarMas.addEventListener('click', function () {
        for (let i = 5; i < elementosLi.length; i++) {
          elementosLi[i].style.display = 'block';
        }
        botonMostrarMas.style.display = 'none';
      });
    }
  },
  listaMovil2: {
    init: function () {

      const grupos = document.querySelectorAll('.part1');

      grupos.forEach(grupo => {
        const lista = grupo.querySelector('section.tabsRH .part1 ul');
        const botonMostrarMas = grupo.querySelector('section.tabsRH .part1 button');
        const elementosLi = lista.getElementsByTagName('li');

        if (elementosLi.length > 5) {
          botonMostrarMas.style.display = 'flex';
        }

        for (let i = 0; i < elementosLi.length; i++) {
          if (i >= 5) {
            elementosLi[i].style.display = 'none';
          }
        }

        botonMostrarMas.addEventListener('click', function () {
          for (let i = 5; i < elementosLi.length; i++) {
            elementosLi[i].style.display = 'block';
          }
          botonMostrarMas.style.display = 'none';
        });
      });
    }
  },
  sliderCaracteristicas: {
    init: function () {
      var swiper2 = new Swiper(".swiperCaracteristicas", {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
        pagination: {
          el: ".swiperCaracteristicas .swiper-pagination",
          dynamicBullets: true,
        },
        breakpoints: {
          1025: {
            slidesPerView: 3,
            pagination: {
              el: "",
              dynamicBullets: true,
            },
          },
          951: {
            slidesPerView: 2.8,
          },
          591: {
            slidesPerView: 2.07,
          },
          400: {
            slidesPerView: 1.4,
          },
          380: {
            slidesPerView: 1.15,
          },
          0: {
            slidesPerView: 1.04,
          },
        },
      });
    }
  },
  menumovil: {
    init: function () {
      const btnMenu = document.querySelector(".menuMovil");
      btnMenu.addEventListener('click', (e) => {
        const menuSection = document.querySelector(".MenuMovilSection");
        const body = document.querySelector("body");
        menuSection.classList.toggle("open");
        btnMenu.classList.toggle("select");
        body.classList.toggle("scrollHidden");
        if (!menuSection.classList.contains("open")) {
          menuSection.classList.add("close");
          setTimeout(() => {
            menuSection.classList.remove("close");
          }, 350);
        }
      });

      const btnSubMenu = document.querySelector(".MenuMovilSection ul li.submenu")
      btnSubMenu.addEventListener('click', (e) => {
        btnSubMenu.classList.toggle("open");
      })
    }
  },
  select: {
    init: function () {
      var select = document.querySelector('.categorias select');
      var categoria2 = "";

      categoria2 = select.value

      select.addEventListener('change', function () {
        var selectedOption = this.options[select.selectedIndex];
        var cateSelect = selectedOption.text.trimStart().trimEnd();
        categoria2 = cateSelect
        if (categoria2 === "Todos") {
          $("#cargarMasModulo").attr("style", "display:flex;");
          $(`.itemArticulo`).hide();
          $(`.itemArticulo.modulo-mas`).slice(0, 6).show();
          if ($(`.modulo-mas:hidden`).length == 0) {
            $("#cargarMasModulo").attr("style", "display:none;");
          }
        } else {
          $("#cargarMasModulo").attr("style", "display:flex;");
          $(`.itemArticulo`).hide();
          $(`.itemArticulo.modulo-mas[data-categoria="${categoria2}"]`).slice(0, 6).show();
          if ($(`.modulo-mas[data-categoria="${categoria2}"]:hidden`).length == 0) {
            $("#cargarMasModulo").attr("style", "display:none;");
          }
        }
      });
      $("#cargarMasModulo").click(function () {
        if (categoria2 === "Todos") {
          $(`.modulo-mas`).slice(0, 6).slideDown(0);
          if ($(`.modulo-mas`).length == 0) {
            $("#cargarMasModulo").attr("style", "display:none;");
          }
        } else {
          $(`.modulo-mas[data-categoria="${categoria2}"]:hidden`).slice(0, 6).slideDown(0);
          if ($(`.modulo-mas[data-categoria="${categoria2}"]:hidden`).length == 0) {
            $("#cargarMasModulo").attr("style", "display:none;");
          }
        }
      });
    }
  },
  redesSticky: {
    init: function () {
      $("section.contentInfoArticulo .part1 .redesCompartir").stick_in_parent({
        offset_top: 200,
        offset_right: 52,
      });
    }
  },
  contador: {
    init: function () {

      gsap.registerPlugin(ScrollTrigger);
      const contadorsec = document.querySelector(".experiencia");

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.experiencia',
          //markers: true,
          start: '-40% 80%',
          end: '100% 140%',
          scrub: 1,
        },
      });

      tl.to(contadorsec, { rotation: 0, duration: 0 })
      tl.fromTo(
        '.experiencia',
        0.1,
        {
          opacity: 1
        },
        {
          opacity: 1
        }
      )

      tl.add(function () {
        const numeros = document.querySelectorAll(".experiencia .contadores .contador h3 span");
        const metas = document.querySelectorAll(".experiencia .contadores .contador .meta");
        const duration = 4000;

        for (let i = 0; i < numeros.length; i++) {
          const numbermeta = parseInt(metas[i].textContent);
          const increment = (numbermeta / duration) * 10;
          let cantidad = 0;

          const tiempo = setInterval(() => {
            cantidad += increment;
            if (cantidad >= numbermeta) {
              cantidad = numbermeta;
              clearInterval(tiempo);
            }
            numeros[i].textContent = Math.round(cantidad);
          }, 10);
        }
      })
    }
  },
  scroll: {
    init: function () {
      document.addEventListener("DOMContentLoaded", function () {
        const scrollButton = document.querySelector("section.bannerNegocios button");
        const segundaSection = document.querySelector(".bajada");
        scrollButton.addEventListener("click", function () {
          const offset = segundaSection.offsetTop - 100;
          window.scrollTo({
            top: offset,
            behavior: "smooth"
          });
        });
      });
    }
  },
  equipoVerMas: {
    init: function () {
      if ($(`.itemEquipo`).length >= 8) {
        $("#cargarMasModulo").attr("style", "display:flex;");
      }
      $(`.itemEquipo.modulo-mas`).hide();
      $(`.itemEquipo.modulo-mas`).slice(0, 8).show(0);
      $("#cargarMasModulo").click(function (e) {
        e.preventDefault();
        $(`.modulo-mas:hidden`).slice(0, 4).slideDown(0);
        if ($(`.modulo-mas:hidden`).length == 0) {
          $("#cargarMasModulo").attr("style", "display:none;");
        }
      })
    }
  },
  listaPortafolio: {
    init: function () {
      if ($(`.itemArticulo`).length >= 6) {
        $("#cargarMasModulo").attr("style", "display:flex;");
      }
      $(`.itemArticulo.modulo-mas`).hide();
      $(`.itemArticulo.modulo-mas`).slice(0, 6).show(0);
      $("#cargarMasModulo").click(function (e) {
        e.preventDefault();
        $(`.modulo-mas:hidden`).slice(0, 2).slideDown(0);
        if ($(`.modulo-mas:hidden`).length == 0) {
          $("#cargarMasModulo").attr("style", "display:none;");
        }
      })
    }
  },
  categoriaBuscador: {
    init: function () {
      const cabeceras = document.querySelectorAll(".categoriasBuscador .cabecera");

      cabeceras.forEach(cabecera => {
        cabecera.addEventListener("click", () => {
          const item = cabecera.parentNode;
          if (item.classList.contains("open")) {
            item.classList.remove("open");
          } else {
            cabeceras.forEach(c => {
              const otroItem = c.parentNode;
              if (otroItem !== item) {
                otroItem.classList.remove("open");
              }
            });
            item.classList.add("open");
          }
        });
      });
    }
  },
  tabSostenibididad: {
    init: function () {
      document.querySelector(".cabecera").closest(".itemTab").classList.add("open");

      const cabeceras = document.querySelectorAll('.cabecera');
      const tabsRH = document.querySelector(".tabsRH")
      cabeceras.forEach(cabecera => {
        cabecera.addEventListener('click', () => {
          const itemTabs = document.querySelectorAll('.itemTab');
          itemTabs.forEach(itemTab => {
            itemTab.classList.remove('open');
          });
          cabecera.parentElement.classList.add('open');
          const offset = tabsRH.offsetTop - 100; // Restamos 50 píxeles
          window.scrollTo({
            top: offset,
            behavior: "smooth"
          });
        })
      });
    }
  },
  mostrarBoton: {
    init: function () {
      if ($(`.contentPDF .item`).length >= 6) {
        $("#cargarMasModulo").attr("style", "display:flex;");
      }
      $(`.item.modulo-mas`).hide();
      $(`.item.modulo-mas`).slice(0, 5).show(0);
      $("#cargarMasModulo").click(function (e) {
        e.preventDefault();
        $(`.modulo-mas:hidden`).slice(0, 5).slideDown(0);
        if ($(`.modulo-mas:hidden`).length == 0) {
          $("#cargarMasModulo").attr("style", "display:none;");
        }
      })
    }
  },
  cambioPageSelect: {
    init: function () {

      document.addEventListener("click", function (e) {
        if (e.target.closest("section.tabs .enlaces a") || e.target.closest("section.tabs select") || e.target.closest("section.tabs select option")) {
          sessionStorage.setItem("scroll", "true");
        } else {
          sessionStorage.setItem("scroll", "false");
        }
      })

      if (sessionStorage.getItem("scroll") === "true") {
        window.scrollTo(0, document.querySelector(".tabs").offsetTop - 100);
      }

      var select = document.querySelector("#seleccionarPagina");
      select.addEventListener("change", function () {
        sessionStorage.setItem("scroll", "true");
        var selectedOption = select.options[select.selectedIndex].value;
        window.location.href = selectedOption;
      });
    }
  },
  selectActive: {
    init: function () {
      document.addEventListener("click", function (e) {
        if (e.target.closest("#seleccionarPagina")) {
          e.target.closest('.lista').classList.toggle("active");
        } else {
          document.querySelector('.lista').classList.remove("active");
        }
      })
    }
  },
  menuStickyInterna: {
    init: function () {
      var yourNavigation = $("section.tabs .content");
      stickyDiv = "sticky";
      yourHeader = ($('section.bannerNegocios').height() + 100);
      console.log(yourHeader);
      $(window).scroll(function () {
        if ($(this).scrollTop() > yourHeader) {
          yourNavigation.addClass(stickyDiv);
        } else {
          yourNavigation.removeClass(stickyDiv);
        }
      });
    }
  },
  menuStickyPublicaciones: {
    init: function () {
      const mediaQuery = window.matchMedia('(max-width: 1280px)');
      function handleMediaQueryChange(event) {
        if (event.matches) {
          $("section.listaBlog .content").stick_in_parent({
            offset_top: 92,
            offset_right: 52,
          });
        } else {
          $("section.listaBlog .content").stick_in_parent({
            offset_top: 100,
            offset_right: 52,
          });
        }
      }
      handleMediaQueryChange(mediaQuery);

    }
  }
}

/* nuevo */
if ($('section.home').length > 0) {
  MyApp.swiperHome.init();
}
/* end nuevo */

if ($('section.listaBlog').length > 0) {
  MyApp.menuStickyPublicaciones.init();
}

if ($('section.tabs').length > 0) {
  MyApp.menuStickyInterna.init();
}

if ($('section.tabs select').length > 0) {
  MyApp.selectActive.init();
}

if ($('section.bannerNegocios button').length > 0) {
  MyApp.scroll.init();
}

if ($('.contentPDF .item').length > 0) {
  MyApp.mostrarBoton.init();
}

if ($('section.tabsRH .itemTab').length > 0) {
  MyApp.tabSostenibididad.init();
}

if ($('.MenuMovilSection').length > 0) {
  MyApp.menumovil.init();
}

if ($('body.page-home').length > 0) {
  MyApp.menuDinamico.init();
}

if ($('.loading').length > 0) {
  MyApp.loadingPrincipal.init();
} else {
  AOS.init();
}

if ($('section.home .fondo').length > 0) {
  MyApp.fondoHomeSticky.init();
}

if ($('.swiperNegocios').length > 0) {
  MyApp.swiperNegocios.init();
}

if ($('.proyectosInterna .part2 .img').length > 0) {
  MyApp.imgStickyProyectoInterna.init();
}

if ($('.listaBlog .categorias').length > 0) {
  MyApp.categorias.init();
}

if ($('.noticiasRelacionadas').length > 0) {
  MyApp.sliderBlog.init();
}

if ($('.oficinas .contentTads').length > 0) {
  MyApp.tabsOficina.init();
}

if ($('.formulario').length > 0) {
  MyApp.validate.init();
}

if ($('footer .desplegable').length > 0) {
  MyApp.desplegable.init();
}

if ($('section.proyectosInterna .part1 ul').length > 0) {
  const mediaQuery = window.matchMedia('(max-width: 500px)');
  function handleMediaQueryChange(event) {
    if (event.matches) {
      MyApp.listaMovil.init();
    }
  }
  handleMediaQueryChange(mediaQuery);
}

if ($('section.tabsRH .part1 ul').length > 0) {
  const mediaQuery = window.matchMedia('(max-width: 500px)');
  function handleMediaQueryChange(event) {
    if (event.matches) {
      MyApp.listaMovil2.init();
    }
  }
  handleMediaQueryChange(mediaQuery);
}

if ($('section.caracteristicas .content').length > 0) {
  MyApp.sliderCaracteristicas.init();
}

if ($('section.listaBlog .container select').length > 0) {
  MyApp.select.init();
}
if ($('section.contentInfoArticulo .part1 .redesCompartir').length > 0) {
  MyApp.redesSticky.init();
}

if ($('section.experiencia .contadores').length > 0) {
  MyApp.contador.init();
}

if ($('section.Equipo.lista').length > 0) {
  MyApp.equipoVerMas.init();
}

if ($('section.mainPortafolio .container .part2 .listProyectos').length > 0) {
  MyApp.listaPortafolio.init();
}

if ($('.categoriasBuscador').length > 0) {
  MyApp.categoriaBuscador.init();
}

if ($('section.tabs').length > 0) {
  MyApp.cambioPageSelect.init();
}