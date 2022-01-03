import router from 'next/router';
// import nextCookie from 'next-cookies'
// import cookie from 'js-cookie'

const authHooks = () => {

    function obtenerToken(Context){
        const { token } = nextCookie(Context)
        return (token) ? token : null
    }

    function obtenerDataUsuario(Context){
        const { dataUser } = nextCookie(Context);
        return (dataUser) ? dataUser : null;
    }

    function obtenerPedidoSinLogin(Context){
        const { pedidoSinLogin } = nextCookie(Context);
        return (pedidoSinLogin) ? pedidoSinLogin : {};
    }

    function authToken(Context){
        const { token } = nextCookie(Context)
        if(!token){
            Context.res.writeHead(302, { Location: '/login' })
            Context.res.end()
        }
        return token;
    }

    function cerrarSesion(){
        cookie.remove('token');
        cookie.remove('dataUser');
        router.push('/')
    }

    return{
        obtenerDataUsuario,
        obtenerToken,
        obtenerPedidoSinLogin,
        authToken,
        cerrarSesion
    }
}
export default authHooks