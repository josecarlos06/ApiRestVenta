export const modelResponse = (data : any, message : string, status : number)=>{
    return {
        message,
        status,
        data: data.rows || []
    }
}