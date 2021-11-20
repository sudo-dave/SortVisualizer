import { Bars } from "./bars.js";
import { Algo } from "./algo.js";

const sizeSlider = document.getElementById("size");
const speedSlider = document.getElementById("speed");
const sortBtns = document.querySelectorAll(".btn:not(:first-child)");
const newSetBtn = document.querySelector(".btn:first-child");

var globalBar;

window.onload = function () {
  globalBar = new Bars();
  globalBar.changeNumberOfBars();
};

sizeSlider.addEventListener("input", () => {
  if (globalBar.isSorting) globalBar.isSorting = false;
  else {
    const sliderVal = sizeSlider.value;
    globalBar = new Bars(sliderVal, speedSlider.value);
    globalBar.changeNumberOfBars();
  }
});

newSetBtn.addEventListener("click", () => {
  if (globalBar.isSorting) {
    if (confirm("Create a new random numbers?"))
      sizeSlider.dispatchEvent(new Event("input"));
  } else sizeSlider.dispatchEvent(new Event("input"));
});

sortBtns.forEach((el) =>
  el.addEventListener("click", (e) => {
    if (globalBar.isSorted) {
      alert("Set is sorted alreaedy");
      return;
    }
    const algoName = e.currentTarget.value;
    const algo = new Algo(globalBar);

    const sortBars = async () => {
      let sort;
      if (algoName === "Selection") sort = await algo.selectionSort();
      else if (algoName === "Bubble") sort = await algo.bubbleSort();
      else sort = await algo.insertionSort();
    };
    sortBars()
      .then(() => {
        globalBar.isSorted = true;
        globalBar.isSorting = false;
        globalBar.changeStateButtons(true);
      })
      .catch((e) => {
        console.log("**" + e);
        globalBar.changeStateButtons(true);
        sizeSlider.dispatchEvent(new Event("input"));
      });
  })
);

speedSlider.addEventListener("input", (e) => {
  const sliderVal = e.currentTarget.value;
  globalBar.setSwapSpeed(sliderVal);
});
