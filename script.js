const selections = {
  pressure: "Intake and dispatch",
  boundary: "existing tools and portals",
  risk: "approval-gated action",
};

const modes = {
  gate: {
    title: "Approval-gated agent workflow",
    copy: "Agents prepare the move, operators approve the risk, and the company keeps the evidence.",
    label: "Mode: Gate",
    items: [
      "Separate read-only review from production action.",
      "Require an operator decision before risky execution.",
      "Attach logs and recovery notes to the handoff.",
    ],
  },
  inspect: {
    title: "Read-only inspection layer",
    copy: "The system sees enough to explain the work without earning permission to change it.",
    label: "Mode: Inspect",
    items: [
      "Collect inputs from calls, notes, portals, APIs, and files.",
      "Normalize messy context into fields an operator can check.",
      "Mark uncertainty before anything is routed or staged.",
    ],
  },
  command: {
    title: "Operator command loop",
    copy: "The person in charge gets a clear command surface instead of a pile of tabs.",
    label: "Mode: Command",
    items: [
      "Expose the next safe actions and the systems each action touches.",
      "Run tool commands through repeatable, logged interfaces.",
      "Keep manual override and stop paths visible.",
    ],
  },
  recover: {
    title: "Evidence and recovery path",
    copy: "The system is not complete until the company can prove, audit, and recover the work.",
    label: "Mode: Recover",
    items: [
      "Store logs, screenshots, validation output, and decisions.",
      "Document rollback steps and unresolved risk.",
      "Turn the handoff into the next operating runbook.",
    ],
  },
};

const briefText = document.getElementById("briefText");
const briefMail = document.getElementById("briefMail");
const mapTitle = document.getElementById("mapTitle");
const mapCopy = document.getElementById("mapCopy");
const mapMode = document.getElementById("mapMode");
const mapList = document.getElementById("mapList");
const commandMap = document.querySelector(".command-map");

function buildBrief() {
  const text = `Schubert Consulting control pilot: map ${selections.pressure.toLowerCase()} across ${selections.boundary.toLowerCase()} with ${selections.risk.toLowerCase()}. Deliver a workflow map, tool and permission registry, approval boundary, command surface recommendation, validation checklist, runbook, and evidence packet before any production access.`;
  briefText.textContent = text;
  const subject = encodeURIComponent("Schubert Consulting control pilot");
  const body = encodeURIComponent(`${text}\n\nSystem notes:\n\nCompany:\n\nBest next step:\n`);
  briefMail.href = `mailto:ianschubert@gmail.com?subject=${subject}&body=${body}`;
}

function setMode(modeName) {
  const mode = modes[modeName];
  if (!mode) return;

  commandMap.dataset.activeMode = modeName;
  mapTitle.textContent = mode.title;
  mapCopy.textContent = mode.copy;
  mapMode.textContent = mode.label;
  mapList.replaceChildren(
    ...mode.items.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );

  document.querySelectorAll("[data-mode]").forEach((button) => {
    const isActive = button.dataset.mode === modeName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
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

document.querySelector("[data-control-tabs]").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-mode]");
  if (!button) return;
  setMode(button.dataset.mode);
});

buildBrief();
setMode("gate");
