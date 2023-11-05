import './App.css';
import { Outlet } from "react-router-dom";
import 'animate.css';



const App = () => {
  return (
    <div className='App'>
      <Outlet />
    </div>
  );
};

export default App;

