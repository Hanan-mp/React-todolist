import { useState } from 'react';
import './App.css';
function App() {
  const [toDos,setToDos] = useState([])
  const [toDo,setToDo] = useState('')
  const [canceledToDos, setCanceledToDos] = useState([]);
  // Define a function that will remove an item based on its id. Use the filter method to
  const deleteItem = (id) => {
    setToDos(prevItems => {
      const itemToCancel = prevItems.find(item => item.id === id);
      if (itemToCancel) {
        // Add the item to the canceledToDos state
        setCanceledToDos(prevCanceled => [...prevCanceled, itemToCancel]);
      }
      // Remove the item from the toDos state
      //  create a new array that excludes the item you want to delete.
      return prevItems.filter(item => item.id !== id);
    });
  };
  return (
  <div className="app">
    <div className="mainHeading">
    <h1>ToDo List</h1>
    </div>
  <div className="subHeading">
      <br />
      <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
    </div>
    <div className="input">
      {/*Assigning to toDo state user input values with using useState*/}
      <input value={toDo} onChange={(e)=>setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
      {/*adding toDo into the toDos state array using thread operator | thread operator is spliting toDos array value and adding toDo value to toDos and there compaining to as 1 array element */}
      <i onClick={()=>setToDos([...toDos,{id:Date.now(),text: toDo, status:false, createdDate: new Date() }])} className="fas fa-plus"></i>
    </div>  
    <div className="todos">
      {/* using the map iteration method to  list the array toDolist elements*/}
    { toDos.map((obj)=>{
      return(<div className="todo">
        <div className="left">
         
          <input onChange={(e)=>{
              console.log(e.target.checked)
            /*using filter for  change the todolist status*/
              setToDos(toDos.filter(obj2=>{
                if (obj2.id===obj.id){
                  /*current input checkbox status assigning..*/
                  obj2.status=e.target.checked
                }
                console.log(obj)
                return obj2
              }))
          }} value={obj.status}type="checkbox" name="" id=""/>
          {/* if status = true the task will be strike */}
          {obj.status ? (
          <p><s>{obj.text}</s></p>)
          // else status false task is just showing in the input field
             : (
        <p>{obj.text}</p> 
      )}
        </div>
        
        <small>Created on: {new Date(obj.createdDate).toLocaleDateString()}  at {new Date(obj.createdDate).toLocaleTimeString()}</small>
        {/* when the delete button clicked the deleteitem function will be call and passing the specific item id in the function */}
        <i onClick={() => deleteItem(obj.id)}  class="fa fa-times" aria-hidden="true"></i>
      </div>
      )})}   
 {/* displaying taskcompleted todos */}
 {/* filtering the toDos data as status==true and data length >0  */}
{toDos.filter(obj => obj.status).length > 0 && (
          <div>
            <h1>Task completed</h1>
            {/* filtering for rendering the task completed task when the checkbox is true and iterating
            for that true data and displaying it  */}
            {toDos.filter(obj => obj.status).map((obj) => (
              <div className="todo" key={obj.id}>
                <div className="left">
                  <p>{obj.text}</p>
                </div>
                <small>
                  Created on: {new Date(obj.createdDate).toLocaleDateString()} at {new Date(obj.createdDate).toLocaleTimeString()}
                </small>
              </div>
            ))}
          </div>
        )}
      {/* Display canceled ToDos */}
    {canceledToDos.length > 0 && (
          <div>
            <h1>Canceled ToDo List</h1>
            {canceledToDos.filter(obj => obj.status===false).map((obj) => (
              <div className="todo" key={obj.id}>
                <div className="left">
                  <p><s>{obj.text}</s></p>
                </div>
                <small>
                  Created on: {new Date(obj.createdDate).toLocaleDateString()} at {new Date(obj.createdDate).toLocaleTimeString()}
                </small>
              </div>
            ))}
          </div>
        )}
    </div>
  </div>
  );
}

export default App;
