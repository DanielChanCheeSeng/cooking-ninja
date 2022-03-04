import { useState, useRef, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";

// styles
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const { postData, data } = useFetch("http://localhost:3001/recipes", "POST");
  const history = useHistory();
  let reciepeData = JSON.parse(window.localStorage.getItem("reciepeData"));

  const handleSubmit = (e) => {
    e.preventDefault();
    // postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
    const newData = reciepeData;
    newData.recipes = [
      ...newData.recipes,
      {
        id: `${newData.recipes.length + 1}`,
        title: title,
        ingredients: ingredients,
        method: method,
        cookingTime: cookingTime + "minutes",
      },
    ];
    window.localStorage.setItem("reciepeData", JSON.stringify(newData));
    history.push("/");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  // redirect the user when we get data response
  useEffect(() => {
    if (data) {
      history.push("/");
    }
  }, [data, history]);

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
}
