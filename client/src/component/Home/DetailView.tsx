import { useEffect } from "react";

export const DetailView = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./src/data/exercise.json");
      const data = await response.json();
      console.log(data);
    };
    fetchData().catch(console.error);
  }, []);
    
    return (<div className="detailView">
      
  </div>);
};
