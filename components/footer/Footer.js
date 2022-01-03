import React from "react";
import { useRef, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {


    return ( 
        <>

          <div id="calzado-section-footer" className="calzado-section">
            <footer className="site-footer footer-default" role="contentinfo" data-loader-script="&lt;div id=">
              <div className="footer-top">       
                  <div className="container-padd60">
                      <div className="row m-0">
                        <div className="col-12 col-md-12 col-lg-4 col-xl-4 ">
                         
                            
                           
                        </div>
                        <div className="col-12 col-md-12 col-lg-4 col-xl-4 ">
                       
                              
                        </div>
                        <div className="col-12 col-md-12 col-lg-4 col-xl-4 ">
                       
                             
                        </div>
  
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 ">
                        
                          <div className="center mb-2">
                                <h5 className=" mb-2">Síguenos</h5>
                                <div className="groups-block div-flex-wrap center ">
                                
                              </div>        
                            <div className="center m-3">
                              © {new Date().getFullYear()} Copyright Gerardine Rodríguez
                            </div>
                        </div>
                      
                      </div>    
                  </div>
                  </div>
              </div>
            </footer>
          </div>

        </>
    );
};

export default Footer;