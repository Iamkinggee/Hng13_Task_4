
import {supabase}   from '../lib/superbase'; 


export const getUserData = async (userId)=>{
    try{
        const {data, error} = await supabase
.from('users')
.select()
.eq('id', userId)
.single();
if(error){
          return{success:false, msg: error?.message};
}
return{success: true, data};
    }catch(error){
        console.log('got error: ', error);
        return{success:false, msg: error.message};
    }
}











// worked

export const updateUser = async (userId, data) => {
  try {
    const { data: updated, error } = await supabase
      .from("users")
      .upsert({ id: userId, ...data })
      .select()
      .single();

    if (error) {
      return { success: false, msg: error.message };
    }

    return { success: true, data: updated };
  } catch (error) {
    return { success: false, msg: error.message };
  }
};









