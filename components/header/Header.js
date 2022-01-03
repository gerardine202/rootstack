import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef, useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import authHooks from '../../hooks/login/authHooks';
import Login from './../login/Login';
// import ContextUniversal from '../../module';

import { capitalizeFirstLetter, obtenerIniciales } from '../../utils/utils';
import { BsCart2} from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";



const Header = ({token}) => {

	const { cerrarSesion } = authHooks();
	// const { dataUser } = useContext(ContextUniversal);

	const router = useRouter();



	const mostrarLogin = () => {
		document.querySelector("html").classList.add("customer-show");
	}




	const cerrarLogin = () => {
		document.querySelector("html").classList.remove("customer-show");
	}



	  useEffect(() => {
		
	
		const handleScroll = () => {};	  
		window.addEventListener("scroll", handleScroll);
		return () => {
		  window.removeEventListener("scroll", handleScroll);
		};
		
	  }, []);

	
	const abrirModulo = () => {
		cerrarLogin();
	}



  return (
	<div className="wrapper-header wrapper_header_parallax">
	  <div id="calzado-section-header-parallax" className="calzado-section">
					
			<header className="site-header header-parallax" role="banner">
				<div className="header-top">
					
				</div>
				<span
					className="icon-nav close-menu-mb"
					title="Menu Mobile Icon"
					data-menu-mb-toogle=""
				>
					<span className="icon-line"></span>
				</span>
				<div id="sticky-wrapper" className="sticky-wrapper is-sticky" >
					<div className="header-bottom" data-sticky-mb="" >
						<div className="container-padd60">
							<div className="header-mb ">          
								<div className="header-mb-left header-mb-items">
									<div className="header-logo">
										<button type="button" className="mobilemenu-toggle" id="m" ><i className="fa fa-bars" aria-hidden="true"></i></button>
										<span className="logo-img " onClick={() => router.push("/")} title="Logo">											
										
										</span>
										
									</div>
								</div>

								<div className="header-mb-middle header-mb-items">
								</div>

								<div className="header-mb-right header-mb-items">
									
										<div className="acc-mb svg-mb">
											<span
												onClick={() => mostrarLogin()}
												title="User Icon"
												className="icon-user"
												data-user-mobile-toggle=""
											>
												{/* {
													(dataUser) ? ( */}
														<div className="icon-user-circle">RS</div>
												{/* // 	) : ( 
												// 		<AiOutlineUser/>
												// 	 )
													
												// } */}
											
											</span>
										</div>
										<div className="svg-mb wishlist-icon">
											<Link href="/favoritos">
												<i className="fa fa-heart fa-icon-heart active" ></i>
										
											</Link>
										</div>
										
									
									</div>          
							</div> 
						</div>
					</div>
				</div>
				<div className="is_parallax">
					<div className="wrapper-header-bt" data-sticky-pc="">
						<div className="container-padd60">
							<div className="header-panel-bt">
								<div className="left-header header-items">
									<div className="header-logo" itemScope="">
										<button type="button" className="mobilemenu-toggle cursor-pointer" id="m" ><i className="fa fa-bars" aria-hidden="true"></i></button>
										<span className="logo-img" onClick={() => router.push("/")} title="Logo" >
											
										</span>
									</div>
								</div>

								<div className="wrapper-navigation">
									<div className="main-menu jas-mb-style">
										<div className="col-12">
											
											<div className="mb-area">
												<div className="lang-currency-groups">
													<div className="option-title">
														<span	title="Close" className="close-option close" >
															<svg
															aria-hidden="true"
															data-prefix="fal"
															data-icon="times"
															role="img"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 320 512"
															className="svg-inline--fa fa-times fa-w-10 fa-2x"
															>
															<path
																fill="currentColor"
																d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
																className=""
															></path>
															</svg>
															<span onClick={() => cerrarMenuLateral()}> Cerrar</span>
														</span>
													</div>
												</div>
												<nav className="nav-bar mt-5 w-100" role="navigation">
													
												</nav>
												<div className="w-100" data-header-pc="">
													<div className="header-links">
														<ul className="ul-menu-lateral">
															<li><span className='span-inicio cursor-pointer' onClick={() => cerrarMenuLateralInicio()}  ><i className='fa fa-home mr-2'></i>Inicio</span></li>
															
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="right-header header-items">
									
									<div className="acc-mb svg-mb">
										<span	onClick={() => mostrarLogin()}	title="User Icon"	className="icon-user"	data-user-mobile-toggle="">
											
												
											<div className="icon-user-circle">RS</div>
											
										
										</span>
									</div>
									<div className="svg-mb wishlist-icon">
										<Link href="/favoritos">
											<i className="fa fa-heart fa-icon-heart active" ></i>
										
										</Link>
									</div>
									<div className="cart-icon svg-mb" data-cart-header-parallax="" >
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		
		
	  	</div>
		<div className="translate-header" data-translate-header="">
			<div id="dropdown-customer" className="ct_login">  
						 
                    
				
			</div>
        


    	</div>
		
	</div>
	
  );
};

export default Header;
