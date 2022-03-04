import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

// styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  // const url = 'http://localhost:3001/recipes/' + id
  // const { error, isPending, data: recipe } = useFetch(url)

  console.log("ID --> ", id);

  let reciepeData = JSON.parse(window.localStorage.getItem("reciepeData"));

  const requiredRecepie = reciepeData.recipes.find(
    (recepie) => recepie.id === id
  );

  return (
    <div className="recipe">
      {/* {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>ing</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )} */}
      {requiredRecepie ? (
        <>
          <h2 className="page-title">{requiredRecepie.title}</h2>
          <p>Takes {requiredRecepie.cookingTime} to cook.</p>
          <ul>
            {requiredRecepie.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{requiredRecepie.method}</p>
        </>
      ) : (
        <h2 className="page-title">No recepie found</h2>
      )}
    </div>
  );
}
