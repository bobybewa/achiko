import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import { Toast } from "./helper/toast/toast";
import { config } from "./config"

firebase.initializeApp(config)

export async function loginUser(email:string, password:any){
    console.log(firebase.initializeApp, 'firebase')
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        return res
    } catch (error) {
        Toast(error.message, 'danger')
        return false
    }
}

export async function registerUser(email:string, password:any){
    try { 
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
        return res
    } catch (error) {
        Toast(error.message, 'danger')
        return false
    }
}

export async function getCurrentUser(){
    return new Promise((resolve, reject) =>{
        const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
            if(user){
                resolve(user)
            }else{
                resolve(null)
            }
            unsubscribe()
        }) 
    })
}


export function Logout(){
    return firebase.auth().signOut()
}