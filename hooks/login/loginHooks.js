// import qs from 'qs'
import NProgress from 'nprogress';
import instanciaAxios from "../../config/axios/instanciaAxios";

const loginHooks = () => {



    async function  iniciarSesionToken (email, password) {
        
        //validamos formulario
    ;
        
        const data = {
            grant_type: "password",
			username: `${email}:${process.env.NEXT_PUBLIC_CENTRO_COSTO}:${process.env.NEXT_PUBLIC_CODIGO_PAGINA}:session`,
			password: password
        }

        try {
            
            NProgress.start();

            let headers = {"Content-type": "application/x-www-form-urlencoded"}
            let clienteAxios = instanciaAxios(headers);
            let resultado = await clienteAxios.post("/security/token", qs.stringify(data)).then((res) => {
                    
                    return res;
                }).catch((e) => {               
                    const error = {};
                    if (e.response) {                   
                       
                        // guardarMensajeInterno(e.response.data.error_description);
                        // guardarCss("error");
                        error.status = 400
                        error.mensaje = e.response.data.error_description
                    }  else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        
                    }

                    return error
                }).then((response) => {    
                    NProgress.done();

                    if(response === null){
                        return {}
                    }                
                    return response;            
                })
            return resultado;
        } catch (error) {      
            //solo para debugear      
            console.log(error)    
            NProgress.done();        
        }
    }

    async function documentoRecuperar(header) {
        try {

            NProgress.start();

            let axios = instanciaAxios(header)

            const documentoRecuperar = await axios.get('/RecuperarClave').then((respuesta) => {
                NProgress.done();
                if(respuesta.status === 200){
                    return respuesta.data
                } else {
                    return {}
                }
            }).catch((error) => {
                return {}
            }).then((data) => {
                return data
            })
            return documentoRecuperar

        } catch (error) {
            console.log(error)
        }
    }

    async function recuperarContrasena(data){
        try {

            NProgress.start();

            let axios = instanciaAxios()

            const documentoRecuperar = await axios.post('/RecuperarClave', data).then((respuesta) => {
                
                if(respuesta.status === 200){
                    return respuesta.data
                } else {
                    return {}
                }
            }).catch((error) => {
                return {}
            }).then((data) => {
                NProgress.done();
                return data
            })
            return documentoRecuperar

        } catch (error) {
            console.log(error)
        }
    }

    async function recuperarDatosCliente(codigo){
        try {

            let header = {
                centroCosto: process.env.NEXT_PUBLIC_CENTRO_COSTO
            }

            NProgress.start();

            let axios = instanciaAxios(header)

            const documentoRecuperar = await axios.get(`RecuperarClave/${codigo}`).then((respuesta) => {
                
                if(respuesta.status === 200){
                    return respuesta.data
                } else {
                    return {}
                }
            }).catch((error) => {
                return {}
            }).then((data) => {
                NProgress.done();
                return data
            })
            return documentoRecuperar

        } catch (error) {
            console.log(error)
        }
    }

    async function actualizarContrasena(data){
        try {

            NProgress.start();

            let axios = instanciaAxios()

            const actualizarContrasena = await axios.put('/RecuperarClave', data).then((respuesta) => {
                
                if(respuesta.status === 200){
                    return respuesta.data
                } else {
                    return {}
                }
            }).catch((error) => {
                return {}
            }).then((data) => {
                NProgress.done();
                return data
            })
            return actualizarContrasena

        } catch (error) {
            console.log(error)
        }
    }

    return {
        iniciarSesionToken,
        documentoRecuperar,
        recuperarContrasena,
        actualizarContrasena,
        recuperarDatosCliente
    }
}
export default loginHooks;