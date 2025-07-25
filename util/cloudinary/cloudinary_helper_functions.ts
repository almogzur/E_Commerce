import { v2 as cloudinary ,UploadApiErrorResponse, UploadApiResponse} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
  

export const createFolderName = (name: string ): string => {
    const sanitizedName = name.replace(/\s+/g, "_"); // Replace spaces with underscores
    // console.log(`${session?.user?.name}/${sanitizedName}`);
      return `${sanitizedName}`;
  };
export const moveToEventNameFolder = async (publicId:string  , eventName :string,session:Session,CallerName?:string):Promise<boolean|undefined>=>{

        try{ 
            const data : UploadApiResponse|UploadApiErrorResponse  = await cloudinary.uploader.explicit(
            publicId,
          {
            type:'upload',
            resource_type:'image',
            asset_folder: createFolderName(eventName),
          }
            );
            if(data){
              console.log("cloudinary moveToEventNameFolder ", "success's" ,data)

              return true
            }
         }
        catch (err){
          console.log("cloudinary moveToEventNameFolder  err" , err )
          return false 
          }
        


  } 
export const delFolder = async(Path:string):Promise<boolean|undefined>=>{
               try{ 
                  const  data = await cloudinary.api.delete_folder(Path);
                  console.log("cloudinary- delFolder" ,"Path:",Path );
                  if(data){
                    return true
                  }
                  }  
                
               catch (err){ 
                   console.log(  " cloudinary del-folder ERR" , err );
                   return false
           
                }
              
  }
export const findSubFolders =  async(Path?:string|null)=>{
         try {
                   // Fetch all subfolders under the root path
                    const { folders } = await cloudinary.api.sub_folders(Path??"") 

                   return folders
             } 
         catch (error) {
                   console.log(`cloudinary find_result  Error:`, error);
                   return false
               
               }
  } 
 export  const delEmptyFolders =  async (Path?:string|null):Promise<boolean>=>{

    const folders = await findSubFolders(Path)

     if(!folders){
          console.log ( " delFolders Return false folders are null " )
        return false
      }
     else if(Array.isArray(folders)){
         folders.map( 
             async (folder: any,i:number)=>{
                 try{
                   const del_result = await delFolder(folder.path)
                   console.log( " folders.map :  del_result ", del_result, "Path " , folder.path );
                   }
                 catch (err){  
           //        console.log("delFolders Map_Over : Del Error",err ,  "Path " , folder.path ) ;
                 }
            })
            return true
     }
     else if(folders && !Array.isArray(folders)) {
        try{ 
         const del_result = await delFolder(folders.path)
         console.log( " folders single : del_result ", del_result, "Path " , folders.path  , "folders is not array " , );
         if(del_result ){
          return true
         }
         return false
          
        }
        catch (err){
     //     console.log("delFolders folders single : Del Error",err , "Path " , folders.path , "folders is not array " );
            return false
         }
     }
     else{
        console.log (  "delEmptyFolders  :  Return false" , typeof folders ,folders,   );
        
      return false
     }
    }
