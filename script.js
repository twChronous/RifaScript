document.addEventListener("DOMContentLoaded", function() {
    let vendedores = [
        { nome: "Luis Eduardo Lima", rifas: 0 },
        { nome: "Matheus Rodrigues", rifas: 0 },
        { nome: "Matheus Farias", rifas: 0 }
    ];

    let divrfTable = document.getElementById("rifasTable");
    let rftable = document.createElement("table");
    let rftableHead = rftable.createTHead();
    let linerftableHead = rftableHead.insertRow();
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    th1.textContent = "Vendedor";
    th2.textContent = "Rifas Vendidas";
    linerftableHead.appendChild(th1);
    linerftableHead.appendChild(th2);
    let rftableBody = rftable.createTBody();
    divrfTable.appendChild(rftable);

    function updateVendedoresTable() {
        rftableBody.innerHTML = "";
        vendedores.forEach(vendedor => {
            let line = rftableBody.insertRow();
            line.insertCell().textContent = vendedor.nome;
            line.insertCell().textContent = vendedor.rifas;
        });
    }

    updateVendedoresTable();

    let hideButton = document.getElementById("tableButton");
    hideButton.addEventListener("click", () => {
        if (divrfTable.style.display === "none") {
            divrfTable.style.display = "block";
            hideButton.textContent = "Esconder Tabela";
        } else {
            divrfTable.style.display = "none";
            hideButton.textContent = "Mostrar Tabela";
        }
    });

    let compradores = [];
    let cmpCount = 1;
    let divcmpTable = document.getElementById("cmpTable");
    let cmpTable = document.createElement("table");
    let cmpHead = cmpTable.createTHead();
    let linecmpHead = cmpHead.insertRow();
    let th3 = document.createElement("th");
    let th4 = document.createElement("th");
    th3.textContent = "ID";
    th4.textContent = "Nome";
    linecmpHead.appendChild(th3);
    linecmpHead.appendChild(th4);
    let cmpTableBody = cmpTable.createTBody();
    divcmpTable.appendChild(cmpTable);

    function printVendedores(vendedores) {
        vendedores.forEach(vendedor => {
            console.log(`Nome: ${vendedor.nome}, Rifas: ${vendedor.rifas}`);
        });
    }

    let select = document.getElementById("selectVendedor");
    vendedores.forEach(vendedor => {
        let option = document.createElement("option");
        option.textContent = vendedor.nome;
        option.value = vendedor.nome;
        select.appendChild(option);
    });

    window.cadastrar = function() {
        let nomeIN = document.getElementById("nomeInput").value;
        let emailIN = document.getElementById("emailInput").value;
        let numeroIN = document.getElementById("numeroInput").value;
        let quant = parseInt(document.getElementById("rifasInput").value);
        let selectedVendedor = document.getElementById("selectVendedor").value;

        let comprador = { nome: nomeIN, email: emailIN, numero: numeroIN };
        compradores.push(comprador);
        localStorage.setItem('compradores', JSON.stringify(compradores));

        for (let i = 0; i < vendedores.length; i++) {
            if (vendedores[i].nome === selectedVendedor) {
                vendedores[i].rifas += quant;
                break;
            }
        }

        let line = cmpTableBody.insertRow();
        line.insertCell().textContent = cmpCount++;
        line.insertCell().textContent = comprador.nome;

        updateVendedoresTable();
        printVendedores(vendedores);

        document.getElementById("nomeInput").value = "";
        document.getElementById("emailInput").value = "";
        document.getElementById("numeroInput").value = "";
        document.getElementById("rifasInput").value = "";
    };
});

