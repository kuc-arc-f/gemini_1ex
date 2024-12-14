import { Routes, Route } from 'react-router-dom';

//
import Home from './client/home';
import Workers2 from './client/workers2';
import Workers3 from './client/workers3';
import Todo11 from './client/todo11';
import Todo12 from './client/todo12';
import Todo13 from './client/todo13';

//
import Test1 from './client/test1';
//
export default function App(){
    return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workers2" element={<Workers2 />} />
        <Route path="/workers3" element={<Workers3 />} />
        <Route path="/todo11" element={<Todo11 />} />
        <Route path="/todo12" element={<Todo12 />} />
        <Route path="/todo13" element={<Todo13 />} />
      </Routes>
    </div>
    )
}
