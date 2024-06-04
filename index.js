import data from "./data.json" with { type: "json" };

const maxScale = 12;
const bars = document.querySelectorAll(".chart-bar div.bar");

let max = data.reduce((accumulator, currentValue) => {
  return {amount:Math.max(accumulator.amount, currentValue.amount)};
}, data[0]);

bars.forEach((item,idx) =>{
  const base =  Math.round((data[idx].amount/max.amount )* 100)/100;
  item.style.height =`${Math.round(base*maxScale)}rem`;
  item.dataset.amount = data[idx].amount;
  if (item.dataset.amount == max.amount)
    {

      if(!item.classList.contains("max"))
      {

        item.classList.add("max")
      }
    }
  
  item.addEventListener("mouseover", ((e) =>{    
    const parent  = e.target.parentElement;
    const tooltip = parent.querySelector(".tooltip");
    if (tooltip.classList.contains("hide"))
      tooltip.classList.remove("hide")
    tooltip.innerHTML = `$${e.target.dataset.amount}`;
    
  }))
  item.addEventListener("mouseout", (e) =>{
    const parent  = e.target.parentElement;
    const tooltip = parent.querySelector(".tooltip");
    if (!tooltip.classList.contains("hide"))
      tooltip.classList.add("hide")
  })
})



