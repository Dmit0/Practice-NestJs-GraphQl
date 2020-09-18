import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {AuthGuard} from '@nestjs/passport'
import {GqlExecutionContext} from '@nestjs/graphql'

@Injectable()
export class AuthenticateGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
     const ctx = GqlExecutionContext.create(context);
     //console.log(ctx)
     return ctx.getContext().req;
  }
  
}