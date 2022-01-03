import React, { useContext, useRef, useState } from 'react'

// import ContextUniversal from '../../module';
import loginHooks from '../../hooks/login/loginHooks';
import { Base64 } from 'js-base64';
import router from "next/router";


function Login({ip}) {  

    const emailRef = useRef();
    const passwordRef = useRef();

    const nombreRegistroRef = useRef();
    const telefonoRegistroRef = useRef();
    const [ mostrarFormularioRecuperarClave, guardarMostrarFormularioRecuperarClave ] = useState(false);    
   
    const [ formularioActulizarClave, guardarFormularioActulizarClave ] = useState(false);
  
    const [ mostrarFormularioRegistro, guardarMostrarFormularioRegistro] = useState(false);

    const { pedidoConsolidar, pedidoCargando } = pedidoHooks();
    const { pedidoSinLogin, guardarRecargarPedido, guardarDataLogin, guardarAutenticarUsuario, guardarAccesToken, guardarCargarMenuUsuario } = useContext(ContextUniversal);
    // const {registrarClienteDetal} = registroHooks();
    const {registrarClienteDetal} = cliennteHooks();
    const {  iniciarSesionToken  } = loginHooks();
    const [ requestActualizarClave, guardarRequestActualizarClave ] = useState({
        centroCosto: process.env.NEXT_PUBLIC_CENTRO_COSTO,
        claveTemporal: "",
        clave1: "",
        clave2: "",
        codigoCliente: ""
    });
    
    const [ password, guardarPassword ] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [openEye, guardarOpenEye] = useState(false);
    // Password toggle handler
    const togglePassword = () => {
         // When the handler is invoked
         // chnage inverse the boolean state passwordShown

        let p_element = document.querySelector(`#btnojo`);
        if(!openEye){
            p_element.classList.remove('fa', 'fa-eye-slash');
            p_element.classList.add('fa', 'fa-eye');
        }else{
            p_element.classList.remove('fa', 'fa-eye');
            p_element.classList.add('fa', 'fa-eye-slash');
        }
       
        guardarOpenEye(!openEye);
       

         setPasswordShown(!passwordShown);
    };



    const cerrarLogin = () => {
		document.querySelector("html").classList.remove("customer-show");
	}

    const onSubmitFormLogin = (e) => {

        if(e !== undefined){
            e.preventDefault();
        }     

        guardarMensajeRecuperar("");
        guardarCssMensaje("");
 
        if(emailRef === undefined || emailRef.current.value === '') {
            guardarMensajeRecuperar("Debe ingresar un correo");
            guardarCssMensaje("error");
            return null;
        }

        if(passwordRef === undefined || passwordRef.current.value === '') {
            guardarMensajeRecuperar("Debe ingresar una contraseña");
            guardarCssMensaje("error");
            return null;
        }

        iniciarSesion(emailRef.current.value, passwordRef.current.value);

    }

    const onSubmitFormregistro = (e) => {
        e.preventDefault();

        registroCliente(emailRef.current.value, nombreRegistroRef.current.value, telefonoRegistroRef.current.value,
                            passwordRef.current.value, "", "", "");

    }

    const iniciarSesion = async (email, clave) => {   

        let response = await iniciarSesionToken(email, clave);

        if(response !== undefined && response !== null && response.status === 200) {                  
            
            if (process.env.NEXT_PUBLIC_CODIGO_PAGINA === "TCB" && response.data.tcb === "0"){
                //VALIDACION DE USUARIO
                guardarMensajeRecuperar("Disculpe, su usuario no está autorizado para ingresar a nuestra web");
                guardarCssMensaje("error");
                return null;
            }

            // if (process.env.NEXT_PUBLIC_CODIGO_PAGINA === "TC" && response.data.tc === "0"){
            //     //VALIDACION DE USUARIO
            //     guardarMensajeRecuperar("Disculpe, su usuario no está autorizado para ingresar a nuestra web");
            //     guardarCssMensaje("error");
            //     return null;
            // }

            if (process.env.NEXT_PUBLIC_CODIGO_PAGINA === "TCS" && response.data.tcs === "0"){
                //VALIDACION DE USUARIO
                guardarMensajeRecuperar("Disculpe, su usuario no está autorizado para ingresar a nuestra web");
                guardarCssMensaje("error");
                return null;
            }

            if(response.data.cajaPedido === "SISTEMA" && response.data.situacionPedido === "BLOQUEADO PAGO APROBADO"){
                guardarMensajeRecuperar("Disculpe, tiene un pedido en proceso de verificación");
                guardarCssMensaje("error");
                return null;
            }

            if(response.data.estatus.toUpperCase() !== "ACTIVO"){
                //VALIDACION DE USUARIO INACTIVO
                guardarMensajeRecuperar("Disculpe, actualmente tiene restringido el ingreso a nuestra Web, por favor contáctenos para ayudarle a recuperar su acceso.");
                guardarCssMensaje("error");
                return null;
            }

            if(response.data.estatusPedido === "CARGANDO" ){
    
                if(response.data.cajaPedido !== "CAJAWEB" && response.data.cajaPedido !== ""){
                    //Disculpe, su pedido está siendo verificado desde un smartphone usando el App ó desde una sucursal. [${response.data.cajaPedido.toLowerCase()}]
                    //VALIDACION DE VERIFICACION DE PEDIDO    
                    guardarMensajeRecuperar(`Disculpe, su pedido está siendo verificado desde un smartphone usando el App ó desde una sucursal. [${response.data.cajaPedido.toLowerCase()}]`);
                    guardarCssMensaje("error");
                    return null;
                }				
                
            }

            //VALIDACION CLAVE TEMPORAL EN S
            if(response.data.clavetemporal === "S"){
                guardarCssMensaje("error");
                guardarMensajeRecuperar("Por favor debe actualizar su contraseña.");
                guardarRequestActualizarClave({
                    ...requestActualizarClave,
                    codigoCliente: response.data.codigo
                })               
                guardarFormularioActulizarClave(true);
                return
            }
            
            let pedido = await pedidoConsolidar(pedidoSinLogin.session, response.data.cedula, response.data.access_token);
            //en caso de que retorne un pedido
            if(pedido){
                if(pedido.numeroPedido !== ""){
                    pedidoCargando(response.data.empresaPedido, pedido.numeroPedido, response.data.correo)                    
                }
                response.data.numeroPedido = pedido.numeroPedido;
            }else {
                //caso contrario
                if(response.data.numeroPedido !== ""){
                    pedidoCargando(response.data.empresaPedido, response.data.numeroPedido, response.data.correo);
                }
            }

            cookie.set('token', response.data.access_token, { expires: 1 });
            cookie.set('dataUser', JSON.stringify(response.data), { expires: 1 });
            guardarAccesToken(response.data.access_token)                       
            guardarDataLogin(response.data);
            guardarRecargarPedido(true);
            guardarCargarMenuUsuario(true);
            cerrarLogin();
            cookie.remove('pedidoSinLogin');
            guardarAutenticarUsuario(true);

        } else if (response !== undefined && response !== null && response.status === 400) {
            guardarCssMensaje("error");
            guardarMensajeRecuperar(response.mensaje);
        }
        
    }



    


    const mostrarDocIdentidad = () => {
        guardarCssMensaje("");
        guardarMensajeRecuperar("");
        
        guardarMostrarFormularioRecuperarClave(true);
    }


 
    
    const registroCliente = async (email, nombre, telefono, clave, idGoogle, idFacebook, login) => {
                       
        let response = await registrarClienteDetal(email, nombre, telefono, clave, idGoogle, idFacebook, login);

        if (response !== null) {
            if(response.codRespuesta === 0 || response.codRespuesta === 23){
                if(login === "google" || login === "facebook"){
                    iniciarSesion(email, Base64.decode(response.pwd));
                }else{
                    iniciarSesion(email, clave);
                }                
            }else{
                guardarMensajeRecuperar(response.mensaje);
                guardarCssMensaje("error");
                return null;
            }          
        }       
    }

    const volverInicioSesion = () => {
        if(emailRef.current !== undefined) {
            emailRef.current.value = "";
        }
        if(passwordRef.current !== undefined) {
            passwordRef.current.value = "";
        }
        if(nombreRegistroRef.current !== undefined) {
            nombreRegistroRef.current.value = "";
        }
        guardarMostrarFormularioRegistro(false);
    }




    return(
        <>
            <div className="customer-title">
                <span title="Close" className="close-customer close" onClick={() => cerrarLogin()}>
                    <svg aria-hidden="true" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-2x"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path></svg>
                    <span>
                        Cerrar
                    </span>
                </span>
                <h5>
                    {(mostrarFormularioRegistro ? "Registro": "Inicio de sesión")}
                    <span style={{width:"20px",paddingLeft:"5px"}}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            id="lnr-user"
                            viewBox="0 0 1024 1024"
                            width="18px"
                            height="18px"
                        >
                            <title>user</title>
                            <path
                            className="path1"
                            d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"
                            ></path>
                            <path
                            className="path2"
                            d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"
                            ></path>
                        </svg>
                    </span>
                </h5>
                
            </div>

            <div className="customer-content">
                
                <div className="customer-inner login-customer">
                    {
                        (mostrarFormularioRecuperarClave) ? (
                            NULL
                        ) : (formularioActulizarClave) ? (
                           
                                NULL
                           
                        ) : (mostrarFormularioRegistro) ? (
                            (
                                <>
                                    <form onSubmit={onSubmitFormregistro} >

                                        <div className="ct-login">
                                            <div className="form-group">
                                                <label  htmlFor="email"><span>Correo</span><em>*</em></label>
                                                <input className="form-control" type="text" name="email" ref={emailRef}  id="email" placeholder="Correo Electrónico" />
                                            </div>
                                            <div className="form-group">
                                                <label  htmlFor="nombreRegistro"><span>Nombre y Apellido</span><em>*</em></label>
                                                <input className="form-control" type="text" name="nombreRegistro" ref={nombreRegistroRef} id="nombreRegistro" placeholder="Nombre y Apellido" />
                                            </div>
                                            <div className="form-group">
                                                <label  htmlFor="telefonoRegistro"><span>Telefono</span><em>(Opcional)</em></label>
                                                <input className="form-control" type="text" name="telefonoRegistro" ref={telefonoRegistroRef} id="telefonoRegistro" placeholder="Telefono" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password"><span>
                                                    Contraseña
                                                </span>
                                                <em>*</em></label>
                                                <input className="form-control" type="password" name="password" ref={passwordRef}  id="password" placeholder="Contraseña" />
                                            </div>                                        
    
                                            <div className="action-btn">
                                                <input type="submit" className="btn btn-login" value="Registrarme"/>
                                            </div>  
    
                                        </div>
                                    </form>
    
                                    <div className="ct-register center">
                                        <span className=" text-hover forgot-password cursor-pointer" onClick={() => volverInicioSesion()}>Volver al <span className="span-registrar">inicio de sesión</span></span>
                                    </div>
                                </>
                            )
                        ) : (
                            <>
                                <form onSubmit={onSubmitFormLogin} >
                                    <div className="ct-login">
                                        <div className="form-group">
                                            <label  htmlFor="email"><span>Cédula ó Correo</span><em>*</em></label>
                                            <input className="form-control" type="text" name="email" ref={emailRef} id="email" placeholder="Cédula ó Correo Electrónico" />
                                        </div>
                                                                       
                                        <div className="form-group input-group mb-3">
                                            <label htmlFor="password" className='w-100'><span>
                                                Contraseña
                                            </span>
                                            <em>*</em></label>
                                            <input 
                                                type={passwordShown ? "text" : "password"}
                                                className="form-control" 
                                                placeholder="Contraseña"
                                                aria-label="Contraseña"
                                                aria-describedby="basic-addon2"
                                                onChange={e => guardarPassword(e.target.value)}
                                                id="password"
                                                autoFocus={false} 
                                                ref={passwordRef}
                                            />
                                            <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" type="button" onClick={togglePassword} title='Ver Contraseña'><i id='btnojo' className="fa fa-eye-slash" title='Ver Contraseña' aria-hidden="true" style={{fontSize:"14.5px"}}></i></button>
                                            </div>
                                        </div>

                                        <div className="action-btn">
                                            <input type="submit" className="btn btn-login" value="Iniciar sesión"/>
                                            <span className="text-hover forgot-password cursor-pointer" onClick={() => mostrarDocIdentidad()} >
                                                Olvidaste tu contraseña?
                                            </span>
                                        </div>  

                                    </div>
                                </form>

                               
                            </>
                        )
                    }
                    
                                   
                    
                </div>
                
            </div>
        </>
    )
}

export default Login