export const obtenerIniciales = (nombreUsuario) => {
		
    let nombreIniciales = "";
    
    if(nombreUsuario !== ""){
        let inicial1 = "";
        let inicial2 = "";
        let split = nombreUsuario.split(" ")
        if(split.length >= 2){
            inicial1 = split[0].substr(0,1)
            if (split[1].length > 0){
                inicial2 = split[1].substr(0,1)
            }
            nombreIniciales = inicial1 + inicial2;
        }else{
            nombreIniciales = split[0].substr(0,1)
        }	            
    }
    
    return nombreIniciales;
    
}
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
  
export const getBase64 = (file, callback) => {

    const reader = new FileReader();
  
    reader.addEventListener('load', () => callback(reader.result));
  
    reader.readAsDataURL(file);
}
