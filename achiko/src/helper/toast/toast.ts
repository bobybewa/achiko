export function Toast(message: string, color:string, duration = 1400) {
    const toast = document.createElement('ion-toast');
    toast.message = message
    toast.duration = duration;
    toast.position = 'top'
    toast.color = color
    document.body.appendChild(toast);
    return toast.present();
}