import MainCompo from "./Comp";
import {createContext, useEffect, useReducer, useState} from "react";
export let MyContext = createContext();
function App(){
  function reducer(state,action){
    switch(action.type){
      case "GET_DATA":
        return {...state,apidata:action.data}
      case "SEARCH":
        return {...state,search: action.q,page:1}
      case "PAGINATION":
        return {...state,page:action.page}
      case "DELETE":
        let {hits,...prev} = state.apidata;
        let mod = hits.filter((val,ind) => {
          return ind !== action.id;
        })
        return {...state,page:1,apidata:{...prev,hits:mod}}
      default:
        return state;
    }
  }
  let [state,dispatch] = useReducer(reducer,{apidata:{},search:"",page:1});
  let [load,chload] = useState(true);
  useEffect(() => {
    chload(true);
    var z = setTimeout(() => {
      fetch(`https://hn.algolia.com/api/v1/search?query=${state.search}&page=${state.page}`)
      .then(res => res.json())
      .then((data) => {
        dispatch({type:"GET_DATA",data});
        chload(false);
      }).catch(err => alert(err));
    }, 500);
    return () => clearTimeout(z);
  },[state.search,state.page]);
  function inpch(val){
    dispatch({type:"SEARCH",q:val});
  }
  function pagech(val){
    dispatch({type:"PAGINATION",page:val});
  }
  function del(val){
    dispatch({type:"DELETE",id:val});
  }
  return <MyContext.Provider value={{...state,inpch,pagech,load,del}}><MainCompo /></MyContext.Provider>
}
export default App;