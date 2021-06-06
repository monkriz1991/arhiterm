/**
 * плагин для изменение url в боазере чтобы сохранить переходы по страницам, фильтрам и т.д.
 * @param app
 * @param route
 * @param inject
 */
export default ({app,route}, inject)=>{
  function addQuery(key,val){
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
  inject('addQuery', function(key,val){addQuery(key,val)})
}
