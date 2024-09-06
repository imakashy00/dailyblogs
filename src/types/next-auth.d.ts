import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth'{
    // we can't do directly interface here
    interface User{
        _id?:string
        isVerified?:boolean
        username?:string
    }
    
    interface Session{
        user:{
            _id?:string
            isVerified?:boolean
            username?:string
        }& DefaultSession['user']
    }
}
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}

// documentation is available at next-auth types or topics related to typescript