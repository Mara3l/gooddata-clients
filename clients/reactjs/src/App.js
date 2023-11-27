import "./App.css";
import { InsightView } from "@gooddata/sdk-ui-ext";

function App() {
  return (
    <div className="App">
      <h1>React.js with GoodData</h1>

      <InsightView
        insight="<INSIGHT-ID>"
      />
    </div>
  );
}

export default App;
