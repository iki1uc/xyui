// µ# = NC-Träger
const muSharp = {
    nc: "NC-GANZ"
};

// Parteien (OP-Ziele)
const parties = [
    { id: 1, name: "P1", op: null },
    { id: 2, name: "P2", op: null },
    { id: 3, name: "P3", op: null },
    { id: 4, name: "P4", op: null }
];

// CALC-Kern
function CALC(input) {
    const nc = muSharp.nc;

    parties.forEach(p => {
        p.op = {
            from: input,
            nc
        };
    });

    return { nc, parties };
}

// MOVE# = universelle Bewegung
function MOVEsharp() {
    return CALC("MOVE#");
}

// RESPO → CALC
document.addEventListener("DOMContentLoaded", () => {
    const respo = document.getElementById("respo");
    const log = document.getElementById("log");

    if (!respo || !log) return;

    respo.addEventListener("click", (e) => {
        const btn = e.target.closest(".cmd");
        if (!btn) return;

        const cmd = btn.dataset.cmd || btn.textContent.trim();
        const result = CALC(cmd);

        log.innerHTML = `
            <div>CMD: ${cmd}</div>
            <div>NC: ${result.nc}</div>
            <div>OP:</div>
            <ul>
                ${result.parties.map(p => `
                    <li>${p.name}: from=${p.op.from}</li>
                `).join("")}
            </ul>
        `;
    });
});

