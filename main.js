

window.addEventListener("load", () => {




    //Elementos del DOM



    const buttonNuevoSorteo = document.getElementById("nuevoSorteo");
    const sectionPanel = document.querySelector(".panel")

    const fondoOverlay = document.getElementById("overlay");

    const panel1 = document.getElementById("pedirNombre");
    const panel2 = document.getElementById("nombresSortear");
    const panel3 = document.getElementById("preguntarExcluir");
    const panel4 = document.getElementById("pedirEvento");
    const panel5 = document.getElementById("pedirFecha");
    const panel6 = document.getElementById("cuantoGastar");

    let paneles = [panel1, panel2, panel3, panel4, panel5, panel6];

    const buttonContinuar = document.getElementById("continuarPanel");
    const buttonRegresar = document.getElementById("regresar");

    let itemsDraggable = document.getElementsByClassName("item-nombre");

    let zonasDrop = document.getElementsByClassName("nombres-excluidos");

    const inputOrganizador = document.getElementById("inputOrganizador");
    const checkBoxOrganizador = document.getElementById("incluirOrganizador");


    const buttonAgregarNombre = document.getElementById("nuevoNombre");

    const containerNombres = document.querySelector(".container-nombres");

    let contenedoresNombres = document.querySelectorAll(".nombre-sorteo");

    const buttonEstablecerExclusiones = document.getElementById("siExclusiones");
    const buttonNoExclusiones = document.getElementById("noExclusiones");

    const buttonsRecomendarNombre = document.querySelectorAll(".boton-opcion");
    const inputOtroNombre = document.getElementById("otroEvento");


    const calendarioFecha = document.getElementById("inputCalendario");


    const buttonsRecomendarFecha = document.querySelectorAll(".boton-recomendacion");


    const buttonsCostos = document.querySelectorAll(".recomendacion-costo");

    const inputCosto = document.getElementById("inputCosto");


    const panelSorteo = document.querySelector(".panel-sorteo");

    const containerRegalos = document.getElementById("containerRegalos");

    const buttonIniciar = document.getElementById("iniciar")

    const buttonSalirPanelSorteo = document.getElementById("salirPanelSorteo");

    const inputFecha = document.getElementById("inputCalendario");

    //Variables


    let eventosGuardados = JSON.parse(localStorage.getItem("eventos"));
    actualizarInterfazEventos();

    let nuevoEvento = {
        organizador: "",
        nombres: [],
        objsExclusiones: [],
        nombreSorteo: "",
        fecha: "",
        costo: 0,
    }


    let panelActual = 1;
    let nombreOrganizador = "";
    let numeroInputNombres = 3;
    let arregloNombres = [];
    let objetosExclusiones = [];
    let festividadSeleccionada;
    let fechaSeleccionada;
    let costoSeleccionado = 0;

    let sorteoIniciado = 0;


    const festividades = [
        {
            festividad: "Navidad",
            dias: [
                "24/12",
                "25/12",
                "26/12"
            ]
        },
        {
            festividad: "Dia de Reyes",
            dias: [
                "05/01",
                "06/01",
                "07/01"
            ]
        },
        {
            festividad: "Dia de San Valentín",
            dias: [
                "13/02",
                "14/02",
                "15/02"
            ]
        },
        {
            festividad: "Graduación",
            dias: [
                "28/06",
                "30/06",
                "02/07"
            ]
        },
        {
            festividad: "Intercambio Escolar",
            dias: [
                "15/12",
                "20/12",
                "22/12"
            ]
        }
    ];


    //Eventos

    //--Click al boton de Nuevo Sorteo
    buttonNuevoSorteo.addEventListener("click", () => {
        sectionPanel.style.display = "flex";
        fondoOverlay.style.display = "flex";

        fechaSeleccionada = "";
        costoSeleccionado = 0;
        festividadSeleccionada = "";


        nuevoEvento = {
            organizador: "",
            nombres: [],
            objsExclusiones: [],
            nombreSorteo: "",
            fecha: "",
            costo: 0,
        }

        panelActual = 1;
        paneles.forEach((panel, i) => {
            panel.style.display = (i + 1 == panelActual) ? "flex" : "none";
        });

        inputOrganizador.value = "";

        //Limpiar inputs de nombres
       document.querySelectorAll(".nombre-sorteo input").forEach(input => {
            input.value = "";
        });
        document.querySelectorAll(".dinamico").forEach(div => div.remove());
        numeroInputNombres = 3;
        //Limpiar exclusiones
        const contenedorBotonesExclsuiones = document.querySelector(".container-botones-exclusiones");
        const tablaExclusiones = document.querySelector(".tabla-exclusiones");


        contenedorBotonesExclsuiones.textContent = "";
        tablaExclusiones.textContent = "";

            //Limpiar recomendaciones nombre evento
            buttonsRecomendarNombre.forEach(button => {
                button.style.backgroundColor = "#C94A4A";
            });
            inputOtroNombre.value = "";

            //Limpiar recomendaciones fecha
            buttonsRecomendarFecha.forEach(button => {
                button.style.backgroundColor = "#C94A4A";
            });
            inputFecha.value = "";
            //Limpiar recomendaciones costo
            buttonsCostos.forEach(button => {
                button.style.backgroundColor = "#C94A4A";
            });
                inputCosto.value = "";

    });

    //Click al boton Continuar
    buttonContinuar.addEventListener("click", () => {
        //Preparar el siguiente panel
        switch (panelActual) {
            case 1:
                nombreOrganizador = inputOrganizador.value;
                if (!nombreOrganizador) {
                    Swal.fire({
                        icon: "warning",
                        title: "Nombre requerido",
                        text: "Ingresa un nombre",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "#6366f1",
                        background: "#f9fafb",
                        color: "#111827"
                    });
                    return;
                } else {
                    nuevoEvento.organizador = nombreOrganizador;
                    if (checkBoxOrganizador.checked) {
                        const primerDivNombres = document.querySelector(".container-nombres > :first-child");
                        const inputPrimerDiv = primerDivNombres.querySelector("input");
                        inputPrimerDiv.value = nombreOrganizador;
                        inputPrimerDiv.disabled = true;
                        const eliminarPrimerDiv = primerDivNombres.querySelector("button");
                        eliminarPrimerDiv.style.display = "none";
                    }
                }
                break;
            case 2:
                contenedoresNombres = document.querySelectorAll(".nombre-sorteo");
                arregloNombres = [];
                objetosExclusiones = [];
                Array.from(contenedoresNombres).forEach(contenedor => {
                    let nombre = contenedor.querySelector("input").value;
                    if (nombre) {
                        arregloNombres.push(nombre);
                        objetosExclusiones.push({ nombre, exclusiones: [] });
                    }
                });
                if (arregloNombres.length < 3) {
                    Swal.fire({
                        icon: "error",
                        title: "Participantes insuficientes",
                        text: "El sorteo debe tener al menos 3 participantes",
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#ef4444",
                        background: "#f9fafb",
                        color: "#111827"
                    });
                    return;
                }
                nuevoEvento.nombres = arregloNombres;
                actualizarNombresExluciones();
                break;
            case 3:
                nuevoEvento.objsExclusiones = objetosExclusiones;
                break;
            case 4:
                if (!inputOtroNombre.value || inputOtroNombre.value.trim().length === 0) {
                    Swal.fire({
                        icon: "warning",
                        title: "Nombre del evento requerido",
                        text: "Ingresa un nombre para el evento",
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#f59e0b",
                        background: "#f9fafb",
                        color: "#111827"
                    });
                    return;
                }
                festividadSeleccionada = inputOtroNombre.value;
                nuevoEvento.nombreSorteo = inputOtroNombre.value;
                actualizarFechas();
                break;
            case 5:
                if (!fechaSeleccionada) {
                    Swal.fire({
                        icon: "warning",
                        title: "Fecha requerida",
                        text: "Selecciona una fecha para tu evento",
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#f59e0b",
                        background: "#f9fafb",
                        color: "#111827"
                    });
                    return;
                }
                nuevoEvento.fecha = fechaSeleccionada;
                break;
            case 6:
                if (!inputCosto.value) {
                    Swal.fire({
                        icon: "warning",
                        title: "Costo requerido",
                        text: "Selecciona un costo para los regalos de tu evento",
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#f59e0b",
                        background: "#f9fafb",
                        color: "#111827"
                    });
                    return;
                }
                nuevoEvento.costo = inputCosto.value;
                if (!eventosGuardados) eventosGuardados = [];
                eventosGuardados.push(nuevoEvento);
                localStorage.setItem("eventos", JSON.stringify(eventosGuardados));
                sectionPanel.style.display = "none";
                fondoOverlay.style.display = "none";
                Swal.fire({
                    icon: "success",
                    title: "¡Evento guardado!",
                    text: "Nuevo evento guardado :)",
                    confirmButtonText: "Genial",
                    confirmButtonColor: "#22c55e",
                    background: "#f9fafb",
                    color: "#111827"
                });
                actualizarInterfazEventos();

                break;

        }
        if (panelActual < paneles.length) {
            panelActual++;
        }
        paneles.forEach((panel, i) => {
            panel.style.display = (i + 1 == panelActual) ? "flex" : "none";
        })
    });


    //Click al boton regresar
    buttonRegresar.addEventListener("click", () => {
        if (panelActual > 1) {
            panelActual--;
        }
        paneles.forEach((panel, i) => {
            panel.style.display = (i + 1 == panelActual) ? "flex" : "none";
        });
    });



    //Click al boton de agregar un Nuevo Nombre
    buttonAgregarNombre.addEventListener("click", () => {

        numeroInputNombres++;


        const nuevoDivNombre = document.createElement("div");
        const nuevoInputNombre = document.createElement("input");
        const nuevoButtonNombre = document.createElement("button");


        nuevoDivNombre.className = "nombre-sorteo dinamico relative";

        nuevoInputNombre.className = "w-full px-2 py-1 border rounded-xl";
        nuevoInputNombre.placeholder = `Añadir nombre ${numeroInputNombres}`;
        nuevoButtonNombre.className = "btn-eliminar absolute right-3 top-1 cursor-pointer";
        nuevoButtonNombre.textContent = "X";

        nuevoDivNombre.appendChild(nuevoInputNombre);
        nuevoDivNombre.appendChild(nuevoButtonNombre);


        containerNombres.appendChild(nuevoDivNombre);

        actualizarBotonesEliminar();

    });







    //-------------------Panel Preguntar Exclusiones---------------------------------


    buttonEstablecerExclusiones.addEventListener("click", () => {
        const contenedorBotonesExclsuiones = document.querySelector(".container-botones-exclusiones");
        const tablaExclusiones = document.querySelector(".tabla-exclusiones");

        tablaExclusiones.style.display = "block";
        contenedorBotonesExclsuiones.style.display = "grid";


        buttonEstablecerExclusiones.style.backgroundColor = "rgb(6,78,59)";
        buttonEstablecerExclusiones.style.color = "white";

        buttonNoExclusiones.style.backgroundColor = "rgb(203,213,225)";
        buttonNoExclusiones.style.color = "rgb(6,78,59)";

    });

    buttonNoExclusiones.addEventListener("click", () => {
        const contenedorBotonesExclsuiones = document.querySelector(".container-botones-exclusiones");
        const tablaExclusiones = document.querySelector(".tabla-exclusiones");

        tablaExclusiones.style.display = "none";
        contenedorBotonesExclsuiones.style.display = "none";




        buttonNoExclusiones.style.backgroundColor = "rgb(6,78,59)";
        buttonNoExclusiones.style.color = "white";


        buttonEstablecerExclusiones.style.backgroundColor = "rgb(203,213,225)";
        buttonEstablecerExclusiones.style.color = "rgb(6,78,59)";
    })


    //---------Panel Exclusiones---------------




    //Iterar los nombres que se pueden arrastrar 
    function asignarDragAndDrop() {
        itemsDraggable = document.getElementsByClassName("item-nombre");
        zonasDrop = document.getElementsByClassName("nombres-excluidos");

        Array.from(itemsDraggable).forEach(item => {
            item.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", item.id);
            });
        });
        //Iterar las zonas donde se puedne dejar los nombres
        Array.from(zonasDrop).forEach(zona => {
            zona.addEventListener("dragover", (e) => {
                e.preventDefault();
            })
            zona.addEventListener("drop", (e) => {
                if (zona.childNodes.length < arregloNombres.length - 2) {
                    e.preventDefault();
                    const id = e.dataTransfer.getData("text/plain");
                    const original = document.getElementById(id);
                    const copia = original.cloneNode(true);

                    const indexZona = parseInt(zona.id.slice(4));

                    if (arregloNombres[indexZona] === original.textContent) {
                        return;
                    }

                    if (objetosExclusiones[indexZona].exclusiones.includes(original.textContent)) {
                        return;
                    }

                    let arregloTotal = objetosExclusiones.flatMap(obj => obj.exclusiones);

                    let veces = arregloTotal.filter(nom => nom === original.textContent).length;

                    if (veces >= arregloNombres.length - 2) {
                        return;
                    }

                    objetosExclusiones[indexZona].exclusiones.push(original.textContent);


                    copia.removeAttribute("id");
                    copia.id = id + "copia";
                    zona.appendChild(copia);
                }
            });
        });

    }

    function actualizarNombresExluciones() {
        const contenedorBotonesExclsuiones = document.querySelector(".container-botones-exclusiones");
        const tablaExclusiones = document.querySelector(".tabla-exclusiones");

        contenedorBotonesExclsuiones.textContent = "";
        tablaExclusiones.textContent = "";

        arregloNombres.forEach((nombre, i) => {
            const botonNombre = document.createElement("button");
            botonNombre.className = "item-nombre p-2 border border-x-green-950 rounded-lg";
            botonNombre.draggable = true;
            botonNombre.id = `nombreExclusion${i}`;
            botonNombre.textContent = nombre;


            const trExclusion = document.createElement("tr");
            const tdNombre = document.createElement("td");
            const tdCanvas = document.createElement("td");
            const canvasZona = document.createElement("div");

            trExclusion.className = "border border-green-950";
            tdNombre.className = "border border-green-950 p-2";
            tdCanvas.className = "border border-green-950 p-1";
            canvasZona.className = "nombres-excluidos w-fit min-w-20 bg-slate-200 min-h-8 h-auto p-1 grid grid-cols-2 gap-2";
            canvasZona.id = `caEx${i}`;

            tdNombre.textContent = nombre;

            tdCanvas.appendChild(canvasZona);

            trExclusion.appendChild(tdNombre);
            trExclusion.appendChild(tdCanvas);

            tablaExclusiones.appendChild(trExclusion);

            contenedorBotonesExclsuiones.appendChild(botonNombre);
        });
        asignarDragAndDrop();
    };



    //----------Panel Pedir Nombres Sorteo----------------------

    function actualizarBotonesEliminar() {

        contenedoresNombres = document.querySelectorAll(".nombre-sorteo");
        Array.from(contenedoresNombres).forEach(contenedor => {
            contenedor.addEventListener("click", (e) => {
                if (e.target.classList.contains("btn-eliminar")) {
                    contenedor.remove();
                    actualizarInputsNombres();
                }
            });
        });
    }

    function actualizarInputsNombres() {
        numeroInputNombres = 1;
        contenedoresNombres = document.querySelectorAll(".nombre-sorteo");
        Array.from(contenedoresNombres).forEach(contenedor => {
            contenedor.querySelector("input").placeholder = `Añadir nombre ${numeroInputNombres}`;
            numeroInputNombres++;
        });
    };

    //------------------Panel Recomendar Nombre ------------------------


    Array.from(buttonsRecomendarNombre).forEach(button => {
        button.addEventListener("click", () => {

            buttonsRecomendarNombre.forEach(b => {
                b.style.backgroundColor = "#C94A4A"
            });
            button.style.backgroundColor = "#d46c6c";
            inputOtroNombre.value = button.textContent.trim();
        });
    });




    //--------------------Panel Fechas ---------------------------------

    function actualizarFechas() {
        const fechaHoy = new Date();
        calendarioFecha.min = fechaHoy.toISOString().split("T")[0];

        festividad = festividades.find(f => f.festividad === festividadSeleccionada);


        buttonsRecomendarFecha.forEach((boton, i) => {
            if (festividad) {
                boton.textContent = festividad.dias[i] + "/" + fechaHoy.getFullYear();
            } else {
                boton.textContent = new Date(new Date(fechaHoy).setDate(fechaHoy.getDate() + i)).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
            }

            boton.addEventListener("click", () => {
                fechaSeleccionada = boton.textContent;
                buttonsRecomendarFecha.forEach(b => {
                    b.style.backgroundColor = "#C94A4A"
                });
                boton.style.backgroundColor = "#d46c6c";
            });

        });


    }

    inputFecha.addEventListener("change", () => {
        const fechaSelecInput = inputFecha.value;
        const [anio, mes, dia] = fechaSelecInput.split("-");

        const fecha = new Date(anio, mes - 1, dia);

        fechaSeleccionada = fecha.toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

    });



    actualizarBotonesEliminar();


    //----------------Panel Costos-----------------


    buttonsCostos.forEach(button => {
        button.addEventListener("click", () => {

            buttonsCostos.forEach(b => {
                b.style.backgroundColor = "#C94A4A"
            });
            button.style.backgroundColor = "#d46c6c";
            inputCosto.value = parseInt(button.textContent.trim());
            costoSeleccionado = button.textContent.trim();
        });
    })



    //Actualizar los eventos del HTML


    function actualizarInterfazEventos() {

        const containerEventos = document.querySelector(".intercambios");
        containerEventos.textContent = "";
        if (!eventosGuardados || eventosGuardados.length === 0) {
            return;
        }
        eventosGuardados.forEach((evento, i) => {
            const container = document.createElement("div");
            container.className = "intercambio flex flex-col w-full justify-center items-center border-4 p-2 border-[var(--rojoPrimario)] rounded-xl gap-2";

            const titleEvento = document.createElement("h2");
            titleEvento.className = "text-3xl text-shadow-lg font-bold bg-[var(--rojoPrimario)] w-full p-2 text-white rounded-lg";
            titleEvento.textContent = evento.nombreSorteo;

            const columnasDesc = document.createElement("div");
            columnasDesc.className = "columnas-descripcion grid grid-cols-1 md:grid-cols-3 w-full justify-items-center";

            const containerCol1 = document.createElement("div");

            const h3NombreOrganizador = document.createElement("h3");
            h3NombreOrganizador.className = "text-lg font-bold";
            h3NombreOrganizador.textContent = "Organizador";

            const nombreOrganizador = document.createElement("p");
            nombreOrganizador.textContent = evento.organizador;

            const h3Participantes = document.createElement("h3");
            h3Participantes.className = "text-lg font-bold";
            h3Participantes.textContent = "Participantes: ";

            const listaParticipantes = document.createElement("ul");
            listaParticipantes.className = "list-disc";

            evento.nombres.forEach(nom => {
                const liNombre = document.createElement("li");
                liNombre.textContent = nom;
                listaParticipantes.appendChild(liNombre);
            });


            containerCol1.appendChild(h3NombreOrganizador);
            containerCol1.appendChild(nombreOrganizador);
            containerCol1.appendChild(h3Participantes);
            containerCol1.appendChild(listaParticipantes);







            const containerCol2 = document.createElement("div");

            const h3Exclusiones = document.createElement("h3");
            h3Exclusiones.className = "text-lg font-bold bg-orange-200 p-2 rounded-lg";
            h3Exclusiones.textContent = "Exclusiones: ";

            const tablaExclusiones = document.createElement("table");

            const theadExclusiones = document.createElement("thead");
            const trThead = document.createElement("tr");

            const tdHead1 = document.createElement("td");
            tdHead1.className = "border p-2";

            const tdHead2 = document.createElement("td");
            tdHead2.className = "border p-2 font-bold";
            tdHead2.textContent = "No le regalara a";

            trThead.appendChild(tdHead1);
            trThead.appendChild(tdHead2);

            theadExclusiones.appendChild(trThead);

            tablaExclusiones.appendChild(theadExclusiones);
            evento.objsExclusiones.forEach(obj => {
                const trObj = document.createElement("tr");

                const tdNombre = document.createElement("td");
                tdNombre.className = "border p-2";

                const tdExclusiones = document.createElement("td");
                tdExclusiones.className = "border p-2";


                tdNombre.textContent = obj.nombre;

                if (obj.exclusiones.length > 0) {
                    const listTd = document.createElement("ul");
                    obj.exclusiones.forEach(nomExc => {
                        const liTd = document.createElement("li");
                        liTd.textContent += nomExc + "";
                        listTd.appendChild(liTd);
                    });

                    tdExclusiones.appendChild(listTd);
                }

                trObj.appendChild(tdNombre);
                trObj.appendChild(tdExclusiones);
                tablaExclusiones.appendChild(trObj);
            });

            containerCol2.appendChild(h3Exclusiones);
            containerCol2.appendChild(tablaExclusiones);







            const containerCol3 = document.createElement("div");

            const containerCosto = document.createElement("div");
            containerCosto.className = "bg-yellow-200 p-2 rounded-lg";

            const h3Costo = document.createElement("h3");
            h3Costo.className = "text-lg font-bold";
            h3Costo.textContent = "Costo: ";


            const pCosto = document.createElement("p");
            pCosto.textContent = "$" + evento.costo;

            containerCosto.appendChild(h3Costo);
            containerCosto.appendChild(pCosto);

            const h3Fecha = document.createElement("h3");
            h3Fecha.className = "text-lg font-bold";
            h3Fecha.textContent = "Fecha: "

            const pFecha = document.createElement("p");
            pFecha.textContent = evento.fecha;

            const buttonInicarSorteo = document.createElement("button");
            buttonInicarSorteo.className = "text-white bg-[var(--rojoPrimario)] rounded-lg p-2 cursor-pointer";
            buttonInicarSorteo.textContent = "Iniciar Sorteo";

            buttonInicarSorteo.addEventListener("click", () => {
                panelSorteo.style.display = "flex";
                fondoOverlay.style.display = "flex";
                const titleSorteo = document.getElementById("titleSorteo");
                titleSorteo.textContent = evento.nombreSorteo;
                sorteoIniciado = i;
                containerRegalos.textContent = "";
            });


            containerCol3.appendChild(containerCosto);
            containerCol3.appendChild(h3Fecha);
            containerCol3.appendChild(pFecha);
            containerCol3.appendChild(buttonInicarSorteo);


            columnasDesc.appendChild(containerCol1);
            columnasDesc.appendChild(containerCol2);
            columnasDesc.appendChild(containerCol3);


            container.appendChild(titleEvento);
            container.appendChild(columnasDesc);

            containerEventos.appendChild(container);
        });
    }


    buttonIniciar.addEventListener("click", iniciarSorteo);





    function generarAsignacion(personas, exclusiones) {

        const asignacion = {};
        const usados = new Set();

        const mapaExclusiones = new Map();


        exclusiones.forEach(e => {
            mapaExclusiones.set(e.nombre, new Set(e.exclusiones));
        });

        function backtrack(index) {

            if (index === personas.length) return true;

            const persona = personas[index];

            for (let candidato of personas) {

                if (persona === candidato) continue;
                if (usados.has(candidato)) continue;

                const excl = mapaExclusiones.get(persona);
                if (excl && excl.has(candidato)) continue;

                asignacion[persona] = candidato;
                usados.add(candidato);

                if (backtrack(index + 1)) return true;

                usados.delete(candidato);
                delete asignacion[persona];
            }

            return false;
        }

        if (backtrack(0)) return asignacion;

        return null;
    }

    function iniciarSorteo() {


        containerRegalos.textContent = "";

        sorteoActual = eventosGuardados[sorteoIniciado];



        noms = sorteoActual.nombres;
        arregloAleatorios = [];

        const copia = [...noms]

        copia.sort(() => Math.random() - 0.5)

        const resultado = generarAsignacion(copia, sorteoActual.objsExclusiones);


        let arregloOrdenado = []

        noms.forEach(n => {
            arregloOrdenado.push(Object.entries(resultado).find(r => r[0] === n));
        });

        const subtitle = document.createElement("p");
        subtitle.className = "font-bold self-end";
        subtitle.textContent = "le regala a:"

        containerRegalos.appendChild(subtitle);

        arregloOrdenado.forEach(asig => {
            const pAsignacion = document.createElement("p");
            pAsignacion.textContent = asig[0] + " → " + asig[1];
            containerRegalos.appendChild(pAsignacion);
        });


    }
    buttonSalirPanelSorteo.addEventListener("click", () => {
        panelSorteo.style.display = "none";
        fondoOverlay.style.display = "none";
    });

});


