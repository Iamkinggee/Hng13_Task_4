// export const getUserImageSrc = imagePath =>{
//     if(imagePath){
//         return{uri: imagePath}
//     }else {
//         return require('../assets/icons/Plus')
//     }
// }



export const getUserImageSrc = (imagePath) => {
  if (imagePath) {
    return { uri: imagePath };
  } else {
    return require('../assets/images/userrr.png'); // must point to an actual image file!
  }
};
