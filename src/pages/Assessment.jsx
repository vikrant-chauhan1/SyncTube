import { useState } from "react";  //using te use state to track the states of every box

export default function MatrixGame() {
  const [clickedBoxes, setClickedBoxes] = useState(Array(9).fill(null)); // initializing a state variable and creating a array of 9 elements with all values set to null
  const [clickOrder, setClickOrder] = useState([]); // state variable to track the order of tracking 

  const handleClick = (index) => {
    if (clickedBoxes[index] || clickOrder.length === 9) return; // if clicked box index already has a valur we return

    const newClickedBoxes = [...clickedBoxes]; // getting all the previous states of the clicked boxes inshort making a copy
    newClickedBoxes[index] = "green";  //storing the color name on the clicked box with index
    setClickedBoxes(newClickedBoxes); // storing the clicked boxes with prev and new updates in the clickedBoxes state variable
    const newClickedOrder=[...clickOrder,index] // making the copy of clicked order so as to prevent error from state update delays
    setClickOrder(newClickedOrder); //updating the clickorder

    if (newClickedOrder.length === 9) {  //only triggers when the last remaining box is clicked 
      setTimeout(() => { // using the set timeout function to show a delay before the colour changes happen  
        newClickedOrder.forEach((idx, i) => { // iterating over the clickorder array idx represents the index of the clicked box and i represents the order in which it was clicked
          setTimeout(() => {
            setClickedBoxes((prev) => {
              const updated = [...prev]; // making the copy of clicked boxes and saving it in updated array
              updated[idx] = "orange"; //setting the value of the index to orange based on the clicked order 
              return updated; 
            });
          }, i* 500); // the index number is multiplied with the delay so all updates do not get proceed at once and the user can see the sequential update of colours according to the clicked order 
        });

        
      }, 500);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "10px" }}>
      {clickedBoxes.map((color, index) => ( //color represent here the stored color string in the array
        <div
          key={index}
          onClick={() => handleClick(index)}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: color || "lightgray", // color stored is used as style bgc attribute and thus the color changes in the ui
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
}
