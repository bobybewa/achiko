import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/home/Home';
import Profile from './pages/profile/profile';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, {useEffect, useState} from 'react'
import { getCurrentUser } from './firebase'


const GuardRoute: React.FC = () => {
  return(
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile/>
          </Route>
        </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => {
  const [busy, isBusy] = useState<boolean>(true);
  useEffect(() =>{
    getCurrentUser().then((user) =>{
      if(user){
        window.history.replaceState({},'','/profile')
      }else{
        window.history.replaceState({},'','/')
      }
      isBusy(false)
    })
  },[])
  return (
    <IonApp>
      {busy ? <IonSpinner/> : <GuardRoute/>}
    </IonApp>
  )
}

export default App;
