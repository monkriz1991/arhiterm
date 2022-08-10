import { App } from '@capacitor/app';



export default {

    async function ({ App }) {
        window.onNuxtReady(() => {
            App.addListener('backButton', data => {
                App.router.go(-1);
                alert('!!!BACK BTN!!!');
            });
        })
    }

}