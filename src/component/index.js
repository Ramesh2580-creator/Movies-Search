import axios from "axios";
export const baseUrl = "https://fakestoreapi.com/";

export const apiCallInstance = axios.create({
    baseUrl: baseUrl,
  
});

export const fetchProducts = async() =>{
    try{
        const response = await apiCallInstance.get("products");
        return response?.data;
    } catch(error){
        console.log(error);
    }
};

export const LoginFunction = async (data) =>{
   try {
    const response = await axios.post(baseUrl+"auth/login",data);
    console.log(response, "Response")
    return response
   } catch (error) {
    
   }
}