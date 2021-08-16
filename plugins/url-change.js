/**
 * плагин для изменение url в боазере чтобы сохранить переходы по страницам, фильтрам и т.д.
 * @param app
 * @param route
 * @param inject
 */
export default ({app,route,params}, inject)=>{
  var saved=JSON.parse(JSON.stringify(route.query));
  var savedCat = null;
  function delQuery(key,cat){
    for(let i in saved){
        if(key===i){
          delete saved[key]
        }
      }
      app.router.replace({path:'/catalog/'+cat,'query':saved});
  }
 function UpdsaveArr(route){
    saved=JSON.parse(JSON.stringify(route.query));
  }
  async function addQuery(key,val,route,cat){

      savedCat = cat;
      saved[key]=val;
      try{
        await app.router.replace({path:'/catalog/'+cat,'query':saved});
      }catch (e){

      }
  }
    async function addQueryFactory(key,val,route,cat){

      savedCat = cat;
      saved[key]=val;
      try{
        await app.router.replace({path:'/catalog/factory/'+cat,'query':saved});
      }catch (e){

      }
  }
    async function addQueryMounters(key,val,route,cat){

      savedCat = cat;
      saved[key]=val;
      try{
        await app.router.replace({path:'/mounters/','query':saved});
      }catch (e){

      }
  }
  function clearSaved(cat){
    if(savedCat!=cat){
      saved = {}
    }

  }
  function parseUrl(obj){
    if(obj!==undefined && obj['flag']){
      route=obj['route'];
    }
  let parametrs = {"cat":route.params.catalog}
    for(let i in route.query){
       parametrs[i]=route.query[i];
    }
    return parametrs
}
  inject('addQuery', function(key,val,route,c){addQuery(key,val,route,c)})
  inject('addQueryFactory', function(key,val,route,c){addQueryFactory(key,val,route,c)})
  inject('addQueryMounters', function(key,val,route,c){addQueryMounters(key,val,route,c)})
  inject('parseUrl', function(params){return parseUrl(params)})
  inject('delQuery', function(k,c){ delQuery(k,c)})
  inject('clearSaved', function(c){ clearSaved(c)})
  inject('UpdsaveArr', function(c){ UpdsaveArr(c)})
}
