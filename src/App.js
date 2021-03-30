import './App.css';
import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import { Route, withRouter } from 'react-router-dom';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Dialogs from './components/Dialogs/Dialogs';
import UsersContainer from './components/Users/UsersContainer'
import ProfileContainer from './components/Profile/ProfileContainer';
import Header from './components/Header/Header';
import Login from './components/Login/login';
import { useSelector, useDispatch } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Loader from './Preloader/Loader';

const App = withRouter((props) => {

  const initialized = useSelector(state => state.appReducer.initialized)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  if (!initialized) {
    return <Loader/>
  }

  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          <Route path='/dialogs' render={() => <Dialogs />} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/news' render={() => <News />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/settings' render={() => <Settings />} />
          <Route path='/login' render={() => <Login />} />
          <Route exact path='/' render={() => <Login />} />
        </div>
        <div className='weather'>
          <div className='weatherYandex'>
            <a href="https://clck.yandex.ru/redir/dtype=stred/pid=7/cid=1228/*https://yandex.ru/pogoda/54" rel="noreferrer" target="_blank"><img src="https://info.weather.yandex.net/54/1_white.ru.png?domain=ru" border="0" alt="Яндекс.Погода"/><img width="1" height="1" src="https://clck.yandex.ru/click/dtype=stred/pid=7/cid=1227/*https://img.yandex.ru/i/pix.gif" alt="" border="0"/></a>
          </div>
        </div>
      </div>
  );
  
})

export default App