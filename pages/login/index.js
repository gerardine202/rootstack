
import { useContext } from 'react';
import Link from 'next/link'
import Layout from "../../components/layout/Layout";
// import ContextUniversal from '../../module';
import Footer from "../../components/footer/Footer";

export async function getStaticProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default function login({}){

    return(
        <Layout>
            <div className="wrapper-container wrapper-body">
                <main className="main-content" role="main">
                    <div className="page-tpl">
                        <div className="container">
                            <div className="breadcrumb">
                                <Link href="/" data-translate="general.breadcrumbs.home">Inicio</Link>  
                                <span className="arrow">
                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </span>
                                <span className="lang1">Reglamento Promocional</span>
                             
                            </div>
                            <header className="page-header">
                                <h2>
                                    <span>
                                    Reglamento Promocional
                                    </span>
                                </h2>  
                            </header>
                            <div className="rte">
                                <p>Tucalzado.com le agradece por visitar nuestro sitio web en donde podrá visualizar la variedad que tenemos para ti, ayudándote siempre a que vistas a tus pies con lo mejor en calzados. Al utilizar este sitio web usted (el usuario) está aceptando los Términos y las Condiciones que se estipulan bajo este convenio los cuales están sujetos a modificaciones que se actualizarán en el momento que tucalzado.com lo considere conveniente, siendo responsabilidad del usuario asegurarse de la revisión continua de las modificaciones realizadas.</p>
                                
                                <h3>Convenio</h3>
                                <p>Se crea el convenio por motivo de uso de la página web www.tucalzado.com y los medios digitales de comunicación directa como lo son: Redes sociales (Facebook, Twitter e Instagram), Mensajería Instantánea (Whatsapp y SMS), Vías De Contacto Adicionales (Email Y Llamada Telefónica) o aplicaciones diseñadas por la compañía (APP), dicha relación se formaliza entre Tucalzado.Com y el usuario, rigiéndose a lo establecido en el texto del presente convenio. Se entiende por Usuario a la persona de cualquier naturaleza que hace usa de los servicios digitales mencionados.</p>
                            
                            
                                <h3>Licencia</h3>
                                <p>
                                    <ul>
                                        <li>1. En celebración del presente convenio, Tucalzado.com otorga al usuario todas las acciones que pueden realizarse en nuestro sitio web, APP, redes sociales y vías de contacto directo; a fin de facilitarle de una mejor manera los accesos a las distintas opciones que le permitan interactuar bajo los términos descritos en este documento.</li>
                                        <li>2. El usuario podrá utilizar (copiar y/o imprimir) cualquier tipo de información publicada en el sitio web www.tucalzado.com; así como en nuestra página de Facebook Tucalzado.com CR y demás canales de comunicación. El usuario acepta que el material publicado o entregado como imágenes, fotografías y Catálogos es exclusivo de tucalzado.com por lo que se encuentran bajo derechos de autor.</li>
                                        <li> 3. Cualquier distribución, redistribución, impresión, reimpresión o venta en medios electrónicos o de forma presencial que se refiera al material (información, documento o gráfico) producidos por Tucalzado.com está totalmente prohibido para uso de comercialización por personal no autorizado o no identificado de Tucalzado.com.</li>
                                    </ul>
                                </p>

                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </Layout>
    )
}