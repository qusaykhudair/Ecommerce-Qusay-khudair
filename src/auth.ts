import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


export const authOptions:NextAuthOptions = {
 pages : {
    signIn : '/login' ,

 },
    providers: [    
        Credentials(
{
            name: "credentials",
            credentials: {
                email : {} ,
                password : {}
            } ,
            authorize : async (values) => {
             const response = await fetch(`${process.env.BASE_URL}/auth/signin`, { 
                method : "POST" ,
                body : JSON.stringify({
                    email : values?.email ,
                    password : values?.password
                }) ,
                headers : {
                    "Content-Type" : "application/json"
                }
             })
                const payload = await response.json() ;
                if (payload.message === 'success') {
 const decodedToken:{id:string} =   jwtDecode(payload.token);
                   console.log(payload)
                    return {
                        id : decodedToken.id,
                        user : payload.user,
                        token : payload.token
                    } ;
                }
                else {
                    throw new Error("email or password is incorrect") ;
                }
            }
} 

        ) ,
    ] ,
    callbacks : {
        async jwt({token , user}){
            if(user){
         token.user = user?.user
          token.token = user.token 
            }
        
          return token 
        } ,
        async session({session , token}) {
            if (token){
            session.user = token.user 
            session.token = token.token;
            }
           
            return session
        }
    }
}