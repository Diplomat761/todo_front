import Todo from "./components/Todo";
import "./App.css";

function App() {
  return (
    <div className="container">
      {/* this is our entry point for the app we will call Todo component to display the form */}
      <Todo />
    </div>
  );
}

export default App;
