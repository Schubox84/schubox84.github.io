const productDetails={
  "Robotics Readiness Sprint":"map one robotics workflow into failure points, human gates, and a first fix",
  "Aerosyn Inspection Demo":"prove a photo-backed vehicle inspection report before hardware spend",
  "SBIR Grant Readiness":"prepare a credible grant and partner evidence packet",
  "Shop Fleet Discovery":"define the first station site, inspection targets, operating constraints, ROI math, and partner evidence plan",
  "Robotics Build Retainer":"support perception, reporting, workflow integration, documentation, and pilot preparation",
  "Funding Roadmap":"align compute credits, hardware discounts, Michigan programs, and grant calendars to the product build"
};
const selections={product:"Robotics Readiness Sprint",detail:productDetails["Robotics Readiness Sprint"],environment:"repair shop or service bay",urgency:"this week"};
const pilotText=document.getElementById("pilotText");
const pilotMail=document.getElementById("pilotMail");
const email="schubertconsultingllc@ianschubert.com";
function brief(){if(!pilotText||!pilotMail)return;const text=`Product: ${selections.product}. Goal: ${selections.detail}. Environment: ${selections.environment}. Timing: ${selections.urgency}. Next step: confirm scope, sample data, site constraints, pilot evidence, and what would make the robotics program fundable.`;pilotText.textContent=text;pilotMail.href=`mailto:${email}?subject=${encodeURIComponent("Schubert Consulting robotics brief: "+selections.product)}&body=${encodeURIComponent(text+"\n\nName:\nOrganization:\nPhone/email:\nLocation/site details:\nVehicle or workflow context:\n")}`}
function setProduct(value,detail){selections.product=value;selections.detail=detail||productDetails[value]||selections.detail}
document.querySelectorAll("[data-choice]").forEach(group=>{group.addEventListener("click",event=>{const button=event.target.closest("button[data-value]");if(!button)return;group.querySelectorAll("button").forEach(b=>{const active=b===button;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});if(group.dataset.choice==="product")setProduct(button.dataset.value,button.dataset.detail);else selections[group.dataset.choice]=button.dataset.value;brief()})});
const requested=new URLSearchParams(location.search).get("product");if(requested){setProduct(requested)}brief();
