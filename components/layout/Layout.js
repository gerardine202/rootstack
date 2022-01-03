import React, { useEffect, useState } from 'react'; 
import Header from '../header/Header';

import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
const Layout = props => {



    useEffect(()=>{
        // if(props.catalogo){
          
        // }
    })
    return ( 
        <>
            <Head>
                <title>{process.env.NEXT_PUBLIC_TITLE}</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="robots" content= "index, follow"/>	
                <meta name="keywords" content="Venta de calzados, Costa Rica, Calzados, Salveques, Loncheras, Bolsos, cartucheras, Canguros, deportivos, formales, zapatos." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000619" />
                <meta name="msapplication-navbutton-color" content="#000619" />
                <meta name="msapplication-window" content="width=1024;height=768" />
                <meta property="og:title" content="tucalzado.com" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="tucalzado.com" />
           
                <>
                    <meta name="description" content="Adquiere los mejores calzados y accesorios para hombre, mujer y niños. Tucalzado tienda virtual que cuenta con marcas premium y una amplia variedad de estilos de zapatos deportivos, seguridad, casual, de vestir y de aventura. También contamos con una línea de ropa ideal para todo tipo de ocasiones. Envío completamente Gratuito. Haga su compra ahora." />
                    <meta property="og:image" itemProp="image" content="https://tcimg.azurewebsites.net/img/cr/web/banners/slider/slider_mob_1.jpg" />
                    <meta property="og:description" content="Adquiere los mejores calzados y accesorios para hombre, mujer y niños. Tucalzado tienda virtual que cuenta con marcas premium y una amplia variedad de estilos de zapatos deportivos, seguridad, casual, de vestir y de aventura. También contamos con una línea de ropa ideal para todo tipo de ocasiones. Envío completamente Gratuito. Haga su compra ahora." />
                    <meta name="msapplication-tooltip" content="Adquiere los mejores calzados y accesorios para hombre, mujer y niños. Tucalzado tienda virtual que cuenta con marcas premium y una amplia variedad de estilos de zapatos deportivos, seguridad, casual, de vestir y de aventura. También contamos con una línea de ropa ideal para todo tipo de ocasiones. Envío completamente Gratuito. Haga su compra ahora." />

                </>
                       
                <link href="/static/css/homestyle.css" rel="stylesheet" type="text/css" media="all"/>
                <link href="/static/css/footer.css" rel="stylesheet" type="text/css" media="all"/>
                <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.scriptJquery }}></script>
                <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.scriptHome }}></script>
                <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.scriptSlick }}></script>
                <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.scripJqueryCookie }}></script>
                
            </Head>  

            


            <div className="App">
                <div className="top-spacer" />
                    
               

                    <div className="content">
                    {
                        (props.verHeader !== undefined && props.verHeader === false) ? ( 
                            null
                        ):(
                            <div className="sticky">
                               
                                <Header 
                                    token={props.token}
                                />
                                	
                            </div>
                        )
                    }                    
                    <main>
                        {props.children}
                    </main>
                </div>
      
                <div className="bottom-spacer"> </div> 
            </div>

            <div id="cover" className="overlay d-none"> </div>                
            

        </>
     );
}
 
export default Layout;