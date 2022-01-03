// import axios from 'axios';

const instanciaAxios = (header) => {
    let instancia
    if(header){
        instancia = axios.create({
            baseURL: process.env.NEXT_PUBLIC_URL_API,
            headers : header
        }) 
    } else {
        instancia = axios.create({
            baseURL: process.env.NEXT_PUBLIC_URL_API            
        }) 
    }
      

    return instancia;     
}
export default instanciaAxios;