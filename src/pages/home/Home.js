import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import jsonReciepeData from "../../data/db.json";
// styles
import "./Home.css";

export default function Home() {
  // const { data, isPending, error } = useFetch("http://localhost:3001/recipes");

  let reciepeData = JSON.parse(window.localStorage.getItem("reciepeData"));

  if (!reciepeData) {
    window.localStorage.setItem("reciepeData", JSON.stringify(jsonReciepeData));
    reciepeData = jsonReciepeData;
  }

  return (
    <div className="home">
      {/* {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />} */}

      {reciepeData && <RecipeList recipes={reciepeData.recipes} />}
    </div>
  );
}
