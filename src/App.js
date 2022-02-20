import { useEffect , useState } from "react";

import "./App.css";
import Index from './page/index/index'
import Create from './page/create/create'

function App() {

  const [create,setCreate] = useState(false)

  return (
    <div className="body">
      <Index/>
    </div>
  );
}

export default App;
