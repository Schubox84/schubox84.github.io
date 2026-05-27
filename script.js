const selections = {
  pressure: "Intake and dispatch",
  boundary: "existing tools and portals",
  risk: "approval-gated action",
};

const briefText = document.getElementById("briefText");
const briefMail = document.getElementById("briefMail");

function buildBrief() {
  const text = `Schubert Consulting control pilot: map ${selections.pressure.toLowerCase()} across ${selections.boundary.toLowerCase()} with ${selections.risk.toLowerCase()}. Deliver a system map, tool and permission registry, approval boundary, runbook, validation checklist, and evidence trail before any production access.`;
  briefText.textContent = text;
  const subject = encodeURIComponent("Schubert Consulting control pilot");
  const body = encodeURIComponent(`${text}\n\nSystem notes:\n\nCompany:\n\nBest next step:\n`);
  briefMail.href = `mailto:ianschubert@gmail.com?subject=${subject}&body=${body}`;
}

document.querySelectorAll("[data-choice]").forEach((group) => {
  group.querySelectorAll("button[data-value]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));
  });

  group.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (!button) return;

    group.querySelectorAll("button").forEach((candidate) => {
      const isActive = candidate === button;
      candidate.classList.toggle("is-active", isActive);
      candidate.setAttribute("aria-pressed", String(isActive));
    });

    selections[group.dataset.choice] = button.dataset.value;
    buildBrief();
  });
});

buildBrief();
