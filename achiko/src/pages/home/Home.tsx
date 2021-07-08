import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './Home.css';
import FormCostum from '../../components/form/FormCostum'
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent >
        <ExploreContainer />
        <FormCostum/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
