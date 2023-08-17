//Idea: After local-strategy applied the user gets added to request object so we will pull the user off the request and make it accessible for controller
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UsersDocument } from "apps/auth/src/users/models/users.schema";

const getCurrentUserByContext = (context: ExecutionContext): UsersDocument => {
    return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getCurrentUserByContext(context),
)