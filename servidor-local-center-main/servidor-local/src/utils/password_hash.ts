import { hash, compare } from "bcrypt";

export async function Hash_Password(password: string){
   return await hash(password, 12);
}
export async function Compare_Password(password: string, password_hash: string){

   return await compare(password, password_hash);
}
