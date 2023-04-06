import {AuthorizationContext, AuthorizationDecision, AuthorizationMetadata, Authorizer} from '@loopback/authorization';
import {
  inject,
  Provider
} from '@loopback/core';
import {Request, RestBindings} from '@loopback/rest';
import jwt from "jsonwebtoken";
import {MyUserProfile} from '../types';

export class MyAuthorizationProvider implements Provider<Authorizer> {
  constructor(
    @inject(RestBindings.Http.REQUEST)
    private req: Request
  ) { }
  /**
   * @returns an authorizer function
   *
   */
  value(): Authorizer {
    return this.authorize.bind(this);
  }

  async authorize(
    context: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ) {
    // Por roles
    const token = this.req.headers.authorization?.substring(7)
    const userProfile = token && process.env.TOKEN_SECRET_VALUE && await jwt.verify(token, process.env.TOKEN_SECRET_VALUE) as MyUserProfile
    if (userProfile && metadata.allowedRoles?.find(role => role === userProfile.role)) return AuthorizationDecision.ALLOW;

    // events.push(context.resource);
    // if (
    //   context.resource === 'OrderController.prototype.cancelOrder' &&
    //   context.principals[0].name === 'user-01'
    // ) {
    //   return AuthorizationDecision.DENY;
    // }
    return AuthorizationDecision.DENY;
  }
}

// General arriba del controller
// @authorize({allowedRoles: ['ADMIN']})
// Arriba de la funcion
// @authorize({resource: 'order', scopes: ['create']})
