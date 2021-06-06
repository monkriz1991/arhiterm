/**
 * плагин для изменение url в боазере чтобы сохранить переходы по страницам, фильтрам и т.д.
 * @param app
 * @param route
 * @param inject
 */
export default ({app,route,params}, inject)=>{
  var saved=route.query;
  function delQuery(key){
    let uri = "?";
    let cop = Object.assign(route.query)
    for(let i in saved){
        if(key===i){
          Reflect.deleteProperty(route.query, key);
          Reflect.deleteProperty(saved,key)
        }else{
          uri+=`${i}=${saved[i]}&`
        }
      }
      app.router.replace({'query':saved});
    uri = uri.slice(0, -1)
     toUri(uri);
  }
  async function addQuery(key,val,route){
      let uri = "?";
      let exist = false;
      for(let i in route.query){
        if(key===i){
          exist = true;
          uri+=`${i}=${val}&`
        }else{
          uri+=`${i}=${route.query[i]}&`
        }
      }

      saved[key]=val;
      try{
        await app.router.replace({'query':saved});
      }catch (e){


      }

      if(!exist){
        uri +=`${key}=${val}`
      }else{
        uri = uri.slice(0, -1)
      }
      toUri(uri)
  }

  function toUri(uri){
    history.replaceState(null, null, `${route.path}${uri}`);
  }

  function parseUrl(){
  let parametrs = {"cat":route.params.catalog}
    for(let i in route.query){
       parametrs[i]=route.query[i];
    }
    return parametrs
}
  inject('addQuery', function(key,val,route){addQuery(key,val,route)})
  inject('parseUrl', function(params){return parseUrl(params)})
  inject('delQuery', function(k){ delQuery(k)})
}
