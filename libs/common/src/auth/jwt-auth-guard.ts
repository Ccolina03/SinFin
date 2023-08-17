import { CanActivate, Injectable } from "@nestjs/common";
import { Auth_Service } from "@app/common";
import { Inject } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, map} from "rxjs";
import { ClientProxy } from "@nestjs/microservices";

//Idea: returning authenticatd user in request from where it can be pulled of when being used by controllers
@Injectable()
export class JwtAuthGuard implements CanActivate {
    
    //Inject auth service connected via proxy
    constructor(@Inject(Auth_Service) private readonly authClient: ClientProxy) {}
        
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const jwt = context.switchToHttp().getRequest().cookies?.Authentication;

        if (!jwt) {  //if no token found return false
            return false; 
        }

        //Idea: validing jwt token if jwt recovered
        //Send message with the extracted jwt to service being talked to defined by messagePattern Authenticate 
        return this.authClient.send('AuthenticateRMQ', {
            Authenticate: jwt
        }).pipe( //apply a series of operators to the observable returned by AuthClient.send
            //adding response to be attached as user in the object request. tap allows side effect to incoming response
            tap((res: any) => {context.switchToHttp().getRequest().user = res;} 
            ),
            map( () => true) //true if auth microservice had a succesful response with user. 
        )
    }
}