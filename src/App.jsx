import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import {apiUrl, filterData } from "./data";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";
import Cards from "./components/Cards";

const App=() =>{
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(filterData[0].title);

    async function fetchData() {
        setLoading(true);
        try {
            let response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            let output = await response.json();
            
            setCourses(output.data);
            console.log(output.data); // printing to check in console
        } 
        catch (error) {
            toast.error("Something went wrong");
        }
        setLoading(false); // Stop Loader
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-bgDark2">
        <div>
            <Navbar />
        </div>
        <div className="bg-bgDark2">
        <div>
          <Filter 
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>

        {/* Main Content Section */}
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {
            loading ? 
            (<Spinner />) :
            (!courses || Object.keys(courses).length === 0) ?(<div>No Courses Found</div>) :
            (<Cards courses={courses} category={category}/>)
          }
        </div>
      </div>

        </div>
    )
}

export default App
