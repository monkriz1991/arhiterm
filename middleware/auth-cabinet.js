export default async function({$auth,redirect,store}){
    let user = $auth.user;
    if(user){

    }else{
        redirect('/')
    }
}