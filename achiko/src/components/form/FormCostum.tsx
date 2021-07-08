import './form.css'
import React, { useState } from 'react'
import { loginUser, registerUser } from '../../firebase'
import { Toast } from '../../helper/toast/toast'
import { IonLoading, IonToggle } from '@ionic/react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { SET_USER_DATA, SET_USER_NAME } from '../../store/reducer/type';
interface Propsss { }
const FormCostum: React.FC<Propsss> = () =>{
    const [panel, setPanel] = useState<string>("sign up")
    const [data, setData] = useState<any>([])
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const history = useHistory()

    function handleChange(e:any):void{
        const target = e.target
        const value = target.value
        const name = target.name
        setData({...data, [name]: value})
    }

    async function handleClick(){
        if(panel === 'sign up'){
            // do somethin
            setIsLoading(true)
            const username = data.email.split('@')[0]
            const email = data.email
            const password = data.password
            const repeatPassword = data.repeatPassword
            const obj = {
                email: email,
                password: password,
            }
            dispatch(SET_USER_DATA(obj))
            const res = await registerUser(email, password)
            
            if(email === '' || password === ''){
                Toast("Email or Password is required", 'danger')
            }
            else if(password !== repeatPassword){
                Toast("Password does not match", 'danger')
            }else if(password.length < 6 ){
                Toast("Password should be at least 6 characters", 'danger')
            }else if(res){
                history.replace('/profile')
                dispatch(SET_USER_NAME(username))
                Toast("Sign Up Successfully", 'success')
            }

            setIsLoading(false)
        }else if(panel === 'sign in'){
            setIsLoading(true)
            const email = data.email
            const password = data.password
            
            if(!email || !password){
                Toast("please fill the blank", "danger")
            }else if(email && password){
                const username = data.email.split('@')[0]
                const obj = {
                    email: email,
                    password: password,
                }
                dispatch(SET_USER_DATA(obj))
                const res = await loginUser(email, password)
                if(res){
                    dispatch(SET_USER_NAME(username))
                    history.replace('/profile')
                    Toast("logged in", 'success')
                }
            }
            setIsLoading(false)
        }

    }

    function swipe(payload:string):void{
        if(payload === 'sign up'){
            setPanel("sign in")
        }else if(payload === 'sign in'){
            setPanel("sign up")
        }
    }
    return(
        <div className="child">
                {/* <IonToggle checked={checked} className="toogle" onIonChange={e => setChecked(e.detail.checked)} /> */}
            <div className="form">
                <IonLoading isOpen={isLoading} message="please wait..."/>
                <div className="title">Welcome</div>
                <div className="subtitle">{panel === 'sign up' ? "Let's create your account!" : "Let's play the journey!"}</div>
                <div className="input-container ic1">
                    <input id="firstname" className="input" name="email" type="email" onChange={handleChange} placeholder=" " />
                    <div className="cut"></div>
                    <label className="placeholder">Email</label>
                </div>
                <div className="input-container ic2">
                    <input id="lastname" className="input" name="password" type="password" onChange={handleChange} placeholder=" " />
                    <div className="cut">

                    </div>
                    <label className="placeholder">Password</label>
                </div>
                {panel === 'sign up' ? 
                    <div className="input-container ic3">
                        <input id="password" className="input" name="repeatPassword" type="password" onChange={handleChange} placeholder=" " />
                        <div className="cut cut-short"></div>
                        <label className="placeholder">Repeat Password</label>
                    </div> : ""
                }
                <button type="submit" onClick={handleClick} className="submit">{panel === "sign up" ? "Sign Up" : "Sign In"}</button>
                {panel === "sign up" ? <p className="bottomRegister">Already have an account? <a href="#" onClick={(e) => swipe(panel)}>Sign In </a> </p> : <p className="bottomRegister">Don't have an account? <a href="#" onClick={(e) => swipe(panel)}>Sign Up </a> </p>}
            </div>
        </div>
    )
}

export default FormCostum