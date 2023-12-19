const getCookie = (name:string) => {
 const cookies = document.cookie.split(';');
 for (const cookie of cookies) {
   const [cookieName, cookieValue] = cookie.trim().split('=');
   if (cookieName === name) {
     return cookieValue;
   }
 }
 return '';
}

const deleteCookie = (name:string) => {
  const date = new Date();
  date.setTime(date.getTime() - 1); // Establecer la fecha de expiración en el pasado
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=;${expires};path=/`;
}

const saveCookie = (name:string, value:any, hours:number | null) => {
const date = new Date(); 
 if(hours){ 
  date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); ///hours 
 }else{
 date.setTime(date.getTime() + (10000 * 24 * 60 * 60 * 1000));//days 
 }
  ///
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
 }

 const toggleToCookie = (name:string,data:any) => {
  
 if(getCookie(name)){
 const cookie = JSON.parse(getCookie(name));
 //console.log('Cookie:',cookie)
 //antes de push verificamos que el valor no este ya , si existe se quita si no se agrega
  if(cookie.indexOf(data) === -1){   
   cookie.push(data);
  }else{
   cookie.splice(cookie.indexOf(data),1);
  }
 saveCookie(name,JSON.stringify(cookie),null); 
 }else{
   let cookie = []
   cookie.push(data);
 saveCookie(name,JSON.stringify(cookie),null);
 } 
 return
 }


export {getCookie,deleteCookie,saveCookie,toggleToCookie}