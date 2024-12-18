const specsData = [
    {
        main_func: "Propulser le scooter",
        sec_funcs: [
            {
                name: "Transmettre la puissance électrique",
                type: "fondamental",
                versions: ["v3"],
                composant: "Controleur",
                solution: "Hardware",
                faisceau: "BATT-ESC",
                protocole: "N/A",
                interfaces: "connecteur Batterie",
            },
            {
                name: "Transmettre la puissance électrique",
                type: "fondamental",
                versions: ["m3"],
                composant: "Controleur",
                solution: "Hardware",
                faisceau: "BATT-ESC",
                protocole: "N/A",
                interfaces: "borniers de puissance",
            },
            {
                name: "Piloter la rotation du moteur",
                type: "fondamental",
                versions: ["v3", "m3"],
                composant: "Controleur",
                solution: "Hardware",
                faisceau: "ESC-MOT",
                protocole: "N/A",
                interfaces: "connecteur Moteur",
            },
        ],
    },
    {
        main_func: "Recharger la batterie",
        sec_funcs: [
            {
                name: "Contrôler la température pendant la charge",
                type: "sécurité",
                versions: ["v3", "m3"],
                composant: "BMS",
                solution: "Firmware",
                faisceau: "N/A",
                protocole: "N/A",
                interfaces: "Sonde température",
            },
            {
                name: "Inhiber moteur pendant la charge",
                type: "sécurité",
                versions: ["v3", "m3"],
                composant: "Controleur",
                solution: "Hardware",
                faisceau: "J2",
                protocole: "12VDC",
                interfaces: "J2-04-TEMP",
            },
            {
                name: "Inhiber moteur pendant la charge",
                type: "sécurité",
                versions: ["m3"],
                composant: "Optocoupleur",
                solution: "Hardware",
                faisceau: "J2",
                protocole: "12VDC",
                interfaces: "J2-04-TEMP",
            },
        ],
    },
    {
        main_func: "Freiner le véhicule",
        sec_funcs: [
            {
                name: "Activer le frein de roue arrière",
                type: "homologation",
                versions: ["v3", "m3"],
                composant: "Frein gauche",
                solution: "Hardware",
                faisceau: "durite",
                protocole: "N/A",
                interfaces: "Poignée gauche",
            },
            {
                name: "Répartir le freinage avant/arrière",
                type: "homologation",
                versions: ["v3", "m3"],
                composant: "Frein droit",
                solution: "Hardware",
                faisceau: "durite",
                protocole: "N/A",
                interfaces: "Poignée droite",
            },
        ],
    },
    {
        main_func: "Accélérer le véhicule",
        sec_funcs: [
            {
                name: "Augmenter la vitesse",
                type: "fondamental",
                versions: ["v3", "m3"],
                composant: "Poignée droite",
                solution: "Hardware",
                faisceau: "durite",
                protocole: "N/A",
                interfaces: "Poignée gauche",
            },
            {
                name: "Répartir le freinage avant/arrière",
                type: "homologation",
                versions: ["v3", "m3"],
                composant: "Frein",
                solution: "Hardware",
                faisceau: "durite",
                protocole: "N/A",
                interfaces: "Poignée droite",
            },
        ],
    },
    {
        main_func: "Signaler le véhicule",
        sec_funcs: [
            {
                name: "Signal sonore",
                type: "homologation",
                versions: ["v3", "m3"],
                composant: "Klaxon",
                solution: "Hardware",
                faisceau: "",
                protocole: "",
                interfaces: "Poignée gauche",
            },
            {
                name: "Signaler direction",
                type: "homologation",
                versions: ["v3", "m3"],
                composant: "Feux de signalisation",
                solution: "Hardware",
                faisceau: "",
                protocole: "N/A",
                interfaces: "Poignée gauche",
            },
        ],
    },
    {
        main_func: "Améliorer confort utilisateur",
        sec_funcs: [
            {
                name: "Poignées chauffantes",
                type: "optionel",
                versions: ["v3", "m3"],
                composant: "chauffe poignées",
                solution: "Hardware",
                faisceau: "",
                protocole: "",
                interfaces: "",
            },
            {
                name: "Anti Tilt",
                type: "optionel",
                versions: ["m3"],
                composant: "ATT",
                solution: "Hardware",
                faisceau: "ATT",
                protocole: "N/A",
                interfaces: "Arduino",
            },
        ],
    },
];

class FunkSpec extends HTMLElement {
    constructor(mainFunc, secFunc, type, version, composant, solution, faisceau, protocole, interfaces) {
        super();

        this.innerHTML = `<div class="funkspec">
        <p>${mainFunc}</p>
        <p>${secFunc}</p> 
        <p>${type}</p> 
        <p>${version}</p> 
        <p>${composant}</p> 
        <p>${solution}</p> 
            <p>${faisceau}</p> 
            <p>${protocole}</p> 
            <p>${interfaces}</p>
            </div>`;
    }

    connectedCallback() {
        // console.log("connected!", this);
    }

    disconnectedCallback() {
        // console.log("disconnected", this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}

customElements.define("funk-spec", FunkSpec);

const DataTable = document.querySelector("#datatable");
console.log("element datatable", DataTable);

const selectors = {
    "func-select": ["All"],
    "sec-select": ["All"],
    "type-select": ["All"],
    "version-select": ["All"],
    "comp-select": ["All"],
    "solution-select": ["All"],
    "cable-select": ["All"],
    "protocole-select": ["All"],
};

const funcSelector = document.querySelector(".func-select");
const secSelector = document.querySelector(".sec-select");
const typeSelector = document.querySelector(".type-select");
const versionSelector = document.querySelector(".version-select");
const compSelector = document.querySelector(".comp-select");
const solutionSelector = document.querySelector(".solution-select");
const cableSelector = document.querySelector(".cable-select");
const protocoleSelector = document.querySelector(".protocole-select");

const removeSpaces = (text) => text.replace(/ /g, "");

const initData = () => {
    specsData.forEach((mainFunc) => {
        let currentMainFunc = mainFunc.main_func;
        if (!selectors["func-select"].includes(currentMainFunc)) {
            selectors["func-select"].push(currentMainFunc);
            funcSelector.innerHTML += `<option value=${removeSpaces(currentMainFunc)}>${currentMainFunc}</option>`;
        }
        mainFunc.sec_funcs.forEach((secFunc) => {
            let currentSecFunc = secFunc.name;
            // if (!selectors["sec-select"].includes(currentSecFunc)) {
            //     selectors["sec-select"].push(currentSecFunc);
            //     secSelector.innerHTML += `<option value=${removeSpaces(currentSecFunc)}>${currentSecFunc}</option>`;
            // }
            let currentFuncType = secFunc.type;
            if (!selectors["type-select"].includes(currentFuncType)) {
                selectors["type-select"].push(currentFuncType);
                typeSelector.innerHTML += `<option value=${removeSpaces(currentFuncType)}>${currentFuncType}</option>`;
            }
            secFunc.versions.forEach((version) => {
                // console.log(selectedVersion, currentSecFunc, "version", version, version === selectedVersion);
                let currentVersion = version;
                let currentComposant = secFunc.composant;
                let currentSolution = secFunc.solution;
                let currentFaisceau = secFunc.faisceau;
                let currentProtocole = secFunc.protocole;
                let currentInterfaces = secFunc.interfaces;
                if (!selectors["version-select"].includes(currentVersion)) {
                    selectors["version-select"].push(currentVersion);
                    versionSelector.innerHTML += `<option value=${removeSpaces(currentVersion)}>${currentVersion}</option>`;
                }
                if (!selectors["comp-select"].includes(currentComposant)) {
                    selectors["comp-select"].push(currentComposant);
                    compSelector.innerHTML += `<option value=${removeSpaces(currentComposant)}>${currentComposant}</option>`;
                }
                if (!selectors["solution-select"].includes(currentSolution)) {
                    selectors["solution-select"].push(currentSolution);
                    solutionSelector.innerHTML += `<option value=${removeSpaces(currentSolution)}>${currentSolution}</option>`;
                }
                if (!selectors["cable-select"].includes(currentFaisceau)) {
                    selectors["cable-select"].push(currentFaisceau);
                    cableSelector.innerHTML += `<option value=${removeSpaces(currentFaisceau)}>${currentFaisceau}</option>`;
                }
                if (!selectors["protocole-select"].includes(currentProtocole)) {
                    selectors["protocole-select"].push(currentProtocole);
                    protocoleSelector.innerHTML += `<option value=${removeSpaces(currentProtocole)}>${currentProtocole}</option>`;
                }
            });
        });
    });
};

const updateSecondaryFuncList = (activeMainFunc) => {
    selectors["sec-select"] = ["All"];
    secSelector.innerHTML = `<option value="All">All</option>`;
    specsData.forEach((mainFunc) => {
        let currentMainFunc = mainFunc.main_func;
        if (activeMainFunc === removeSpaces(currentMainFunc)) {
            mainFunc.sec_funcs.forEach((secFunc) => {
                let currentSecFunc = secFunc.name;
                if (!selectors["sec-select"].includes(currentSecFunc)) {
                    selectors["sec-select"].push(currentSecFunc);
                    secSelector.innerHTML += `<option value=${removeSpaces(currentSecFunc)}>${currentSecFunc}</option>`;
                }
            });
        }
    });
};

const listFunctions = () => {
    DataTable.innerHTML = "";
    specsData.forEach((mainFunc) => {
        let currentMainFunc = mainFunc.main_func;
        if (["All", removeSpaces(currentMainFunc)].includes(funcSelector.value)) {
            mainFunc.sec_funcs.forEach((secFunc) => {
                let currentSecFunc = secFunc.name;
                let currentFuncType = secFunc.type;
                if (["All", removeSpaces(currentFuncType)].includes(typeSelector.value)) {
                    secFunc.versions.forEach((version) => {
                        // console.log(selectedVersion, currentSecFunc, "version", version, version === selectedVersion);
                        let currentVersion = version;
                        let currentComposant = secFunc.composant;
                        let currentSolution = secFunc.solution;
                        let currentFaisceau = secFunc.faisceau;
                        let currentProtocole = secFunc.protocole;
                        let currentInterfaces = secFunc.interfaces;
                        if (
                            [versionSelector, compSelector, solutionSelector, cableSelector, protocoleSelector].every((sel) =>
                                ["All", currentVersion, currentComposant, currentSolution, currentFaisceau, currentProtocole]
                                    .map(removeSpaces)
                                    .includes(sel.value)
                            )
                        ) {
                            let currentFunkSpec = new FunkSpec(
                                currentMainFunc,
                                currentSecFunc,
                                currentFuncType,
                                currentVersion,
                                currentComposant,
                                currentSolution,
                                currentFaisceau,
                                currentProtocole,
                                currentInterfaces
                            );
                            // document.body.append(currentFunkSpec);
                            DataTable.append(currentFunkSpec);
                        }
                    });
                }
            });
        }
    });
};

initData();
listFunctions();

funcSelector.addEventListener("change", (e) => {
    secSelector.disabled = e.target.value === "All";
    if (e.target.value !== "All") {
        updateSecondaryFuncList(removeSpaces(e.target.value));
    }
    listFunctions();
});

[secSelector, typeSelector, versionSelector, compSelector, solutionSelector, cableSelector, protocoleSelector].forEach((sel) =>
    sel.addEventListener("change", (e) => {
        listFunctions();
    })
);
