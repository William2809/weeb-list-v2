import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Watchlist from './pages/Watchlist';
import Discover from './pages/Discover';
import Schedule from './pages/Schedule';
import Setting from './pages/Setting';
import SideBar from './components/SideBar';
import Anime from './pages/Anime';

function App() {

  return (
    <div>
      <Router>
        {/* public */}
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/sign-up' element={<Register />}></Route>
          <Route path='/sign-in' element={<Login />}></Route>
        </Routes>

        {/* private */}
        <SideBar>
          <Routes>
            <Route path='/home' element={<PrivateRoute />}>
              <Route path='/home' element={<Home />} />
            </Route>

            <Route path='/schedule' element={<PrivateRoute />}>
              <Route path='/schedule' element={<Schedule />} />
            </Route>

            <Route path='/discover' element={<PrivateRoute />}>
              <Route path='/discover' element={<Discover />} />
            </Route>

            <Route path='/watchlist' element={<PrivateRoute />}>
              <Route path='/watchlist' element={<Watchlist />} />
            </Route>

            <Route path='/setting' element={<PrivateRoute />}>
              <Route path='/setting' element={<Setting />} />
            </Route>

            <Route path='/anime/:id/latest' element={<PrivateRoute />}>
              <Route path='/anime/:id/latest' element={<Anime />} />
            </Route>

            <Route path='/anime/:id' element={<PrivateRoute />}>
              <Route path='/anime/:id' element={<Anime />} />
            </Route>

          </Routes>
        </SideBar>
      </Router>
    </div>
  );
}

export default App;
