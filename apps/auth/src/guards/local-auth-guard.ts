import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGuard extends AuthGuard('local') {}  //"local" key point to execute the validate from local-strategy.ts before login