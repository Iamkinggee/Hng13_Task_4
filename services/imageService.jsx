// import  supabase  from '../lib/superbase';
// import {decode} from 'base64-arraybuffer';
// import * as FileSystem from 'expo-file-system';
// import { supabaseUrl } from '../constants';


// export const getUserImageSrc = (imagePath) => {
//   if (imagePath) {
//     return getSupabaseFileUrl(imagePath);
//   } else {
//     return require('../assets/images/userrr.png'); 
//   }
// };

// export const getSupabaseFileUrl = filePath =>{
//   if(filePath){
//     return{ uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}` }
//   }

//   return null;
// }


// export const uploadFile =async(folderName,  fileUri, isImage = true)=>{
//   try{
//    let fileName = getFilePath(folderName, isImage);
//    const fileBase64 = await FileSystem.readAsStringAsync(fileUri,{
//     encoding: FileSystem.encodingType.Base64
//    });


//     let imageData = decode(fileBase64);
//     let {data, error} = await supabase
//     .storage
//     .from('uploads')
//     .upload(fileName, imageData, {
//       cacheControl: '3600',
//       upsert:false,
//       contentType: isImage? 'image/*': 'video/*'
//     });

//     if(error){
//       console.log('file upload error: ', error);
//       return{success: false, msg: 'Could not upload media'};
//     }

//    console.log('data:', data);
//     return {success: true, data: data.path}


//   }catch(error){
//     console.log('file upload error: ', error);
//     return{success: false, msg: 'Could not uplaod media'};
//   }


// }

// export const getFilePath = (folderName, isImage)=>{
//   return `/${folderName}/${(new Date()).getTime()}${isImage? '.png':'.mp4'}`;
// }
 


















import { supabase } from '../lib/superbase'; 
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

// ──────────────────────────────────────────────
// Get Image Source (Local or Default)
// ──────────────────────────────────────────────
export const getUserImageSrc = (imagePath) => {
  if (imagePath) {
    return { uri: imagePath };
  }
  return require('../assets/images/userrr.png');
};

// ──────────────────────────────────────────────
// Upload File to Supabase Storage
// ──────────────────────────────────────────────
export const uploadFile = async (folderName, fileUri, isImage = true) => {
  try {
    if (!fileUri) {
      return { success: false, msg: 'No file URI provided' };
    }

    // Generate unique file path
    const filePath = getFilePath(folderName, isImage);
    const fileName = filePath.split('/').pop();

    // Read file as base64
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 to ArrayBuffer
    const arrayBuffer = decode(base64);

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filePath, arrayBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: isImage ? 'image/png' : 'video/mp4',
      });

    if (error) {
      console.error('Upload error:', error);
      return { success: false, msg: 'Could not upload media' };
    }

    // Return full public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);

    return { success: true, data: { path: filePath, url: publicUrl } };

  } catch (error) {
    console.error('File upload exception:', error);
    return { success: false, msg: 'Could not upload media' };
  }
};

// ──────────────────────────────────────────────
// Generate Unique File Path
// ──────────────────────────────────────────────
export const getFilePath = (folderName, isImage = true) => {
  const timestamp = new Date().getTime();
  const extension = isImage ? '.png' : '.mp4';
  return `${folderName}/${timestamp}${extension}`;
};

























