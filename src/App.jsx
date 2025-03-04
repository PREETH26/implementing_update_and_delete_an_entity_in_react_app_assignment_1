import { useEffect,useState } from "react";
import axios from 'axios'
import UpdateItem from "./components/UpdateItem";
import { useParams } from "react-router-dom";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`;

function App() {
  // Get the existing item from the server
 
  const [item, setItem] = useState();
  // pass the item to UpdateItem as a prop
  useEffect(()=>{
    const x = async()=> {
    try{
      const json = await axios.get(API_URI)
      // console.log(json.data)
      setItem(json.data)
    }
    catch(err){
      console.log(err)
    }
  }
     x();
},[])

  // console.log(item)
  return  <UpdateItem items={item}/>;
}

export default App;
