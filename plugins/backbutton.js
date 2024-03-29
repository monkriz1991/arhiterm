import { App } from '@capacitor/app';

export default {

    async function ({ App }) {
        window.onNuxtReady(() => {
            App.addListener('backButton', data => {
                // console.log(App.router)
                App.router.go(-1);
            });
        })
    }

}