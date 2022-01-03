import axios from '../axios/instanciaAxios';

const instanciaAxiosImg = (header) => {
    let instancia = null;
    if(header){
        instancia = axios.create({
            baseURL: process.env.NEXT_PUBLIC_URL_API_IMAGENES,
            headers : header
        }) 
    } else {
        instancia = axios.create({
            baseURL: process.env.NEXT_PUBLIC_URL_API_IMAGENES            
        }) 
    }
      

    return instancia;     
}
export default instanciaAxiosImg;