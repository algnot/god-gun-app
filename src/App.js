import { useEffect , useState } from "react"
import queryString from 'query-string'

import "./App.css";

import Index from './page/index/index'
import Create from './page/create/create'
import Created from "./page/created/created";
import Loading from "./component/loading/loading";

function App() {
  const parsed = queryString.parse(window.location.search); 

  const [page,setPage] = useState('')
  const [showLoading,setShowLoading] = useState(false)

  useEffect(() => {
    setPage(parsed.p ? parsed.p : 'home')
  }, [])
  
  return (
    <div className="body">
      {
        showLoading && <Loading />
      }
      {
        page == 'home' ? <Index/>
        : page == 'create' ? <Create setLoading={setShowLoading} />
        : page == 'created' ? <Created setLoading={setShowLoading} />
        : <Index/>
      }
    </div>
  );
}

export default App;
