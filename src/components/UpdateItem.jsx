import { useState, useEffect } from "react";
import axios from "axios";

const UpdateItem = ({ items }) => {

    const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`; // Using a fixed ID for now

    const [values, setValues] = useState({
        id: items?.id || "",
        name: items?.name || "",
        status: items?.status || ""
    });
    const [res,setRes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API_URI);
                setValues({
                    id: res.data.id,
                    name: res.data.name,
                    status: res.data.status
                });
            } catch (err) {
                console.log("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);  // Only fetch once on mount

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(API_URI, values);
            console.log("Updated successfully:", res.data);
            setRes(res.data)
            
        } catch (err) {
            console.log("Error updating data:", err);
        }
    };
    

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input 
                value={values.name} 
                onChange={(e) => setValues(prev => ({ ...prev, name: e.target.value }))} 
                placeholder="Name"
            />
            <input 
                value={values.status} 
                onChange={(e) => setValues(prev => ({ ...prev, status: e.target.value }))} 
                placeholder="Status"
            />
            <button type="submit">Submit</button>
        </form>
        {res && <h1>{JSON.stringify(res)}</h1>}        
        </>
    );
};

export default UpdateItem;
