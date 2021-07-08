import React from 'react';
import './card.css'
// import * as style from '@dicebear/avatars-identicon-sprites';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Logout } from  '../../firebase'
import { SET_USER_BIRTHDAY, SET_USER_NAME } from '../../store/reducer/type'
import { Toast } from '../../helper/toast/toast'
import { IonContent, IonInput, IonCard, IonCardHeader, IonCardTitle, IonDatetime, IonLabel, IonCardContent, IonItem, IonButton, IonModal } from '@ionic/react';interface Card { }

const CardProfile:React.FC<Card> = () =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const name = useSelector((state:any) => state.name)
    const birthday = useSelector((state:any) => state.birthday)
    const [editName, setEditName] = useState<string>(name)
    const [selectedDate, setSelectedDate] = useState<any>(birthday);
    const [arr, setArr] = useState<any>([
        "CEO & Founder Neki",
        "CTO Adibas",
        "IT Constultan Gulu-Gulu",
        "Perakit PC Handal",
        "Founder Tasle"
    ])
    const [showModal, setShowModal] = useState(false);
    const random = Math.floor(Math.random() * arr.length)
    const getRandom = arr[random]
    const dateString = selectedDate.toString().split('T')[0]
    let avatar = `https://avatars.dicebear.com/api/human/${name}.svg`
    function updateData(){
        if(editName === ''){
            Toast("name is required", "danger")
        }else{
            dispatch(SET_USER_BIRTHDAY(selectedDate))
            dispatch(SET_USER_NAME(editName))
            setShowModal(false)
            Toast("profile updated", 'success')
        }
    }
    function goHome() {
        Logout()
        history.replace('/')
        Toast("logout success", 'success')
    }
    return(
        <div className="contain">
            <IonContent >
                <IonModal isOpen={showModal} cssClass='my-custom-'>
                <IonCard className="cardIon">
                    <IonCardHeader>
                        <IonCardTitle className="titleIon">Edit Profile</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent >
                        <IonItem>
                            <IonInput value={editName} onIonChange={(e:any) => setEditName(e.target.value)} placeholder="Enter Your Name" ></IonInput>
                        </IonItem>

                        <IonItem>
                            <IonLabel>MM DD YY</IonLabel>
                                <IonDatetime max="2008" displayFormat="DD MMM YYYY" placeholder="Select Date" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
                        </IonItem>
                    <IonButton onClick={updateData}>Update</IonButton>
                    <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
                    </IonCardContent>
                </IonCard>
                </IonModal>
            </IonContent>
            <div className="card">
                <img src={avatar} alt="oke" className="imgCard"/>
                <h1 style={{color: '#fff'}}>{name}</h1>
                <p style={{color: '#fff'}}>{dateString}</p>
                <p className="title">{getRandom}</p>
                <div className="grid-container">
                    <button className="btnFooter" onClick={() => setShowModal(true)}>Edit Profile</button>
                    <button className="btnFooter" onClick={goHome}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default CardProfile