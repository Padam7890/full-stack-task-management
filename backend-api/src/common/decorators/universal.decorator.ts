import { applyDecorators, CanActivate, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Permissions } from './permissions.decorator';
import { Auth } from './auth.decorator';

/**
 * UniversalDecoratorOptions interface defines the options that can be passed to the UniversalDecorator.
 * @param {string} [role] - Optional role required for the decorated route.
 * @param {string[]} [permissions] - Optional permissions required for the decorated route.
 * @param {string} [summary] - Optional summary for the API operation.
 * @param {any} [responseType] - Optional response type for the API response.
 * @param {any} [body] - Optional request body schema for the API operation.
 * @param {boolean} [includeBearerAuth=false] - Optional flag to include API Bearer Auth.
 * @param {any[]} [guards=[]] - Optional guards to be applied to the decorated route.
 */
interface UniversalDecoratorOptions {
  role?: string;
  permissions?: string[];
  summary?: string;
  responseType?: any;
  body?: any;
  includeBearerAuth?: boolean;
  guards?: any;
}

/**
 * UniversalDecorator is a custom decorator that applies various NestJS decorators based on the provided options.
 * @param {UniversalDecoratorOptions} options - The options for the UniversalDecorator.
 * @returns {MethodDecorator} - The composed decorator to be applied to the route handler.
 */
export function UniversalDecorator({
  role,
  permissions,
  summary,
  responseType,
  includeBearerAuth = false,
  body,
  guards = [],
}: UniversalDecoratorOptions) {
  const decorators = [];

  if (includeBearerAuth) {
    decorators.push(ApiBearerAuth('JWT-auth'));
  }

  if (body) {
    decorators.push(
      ApiBody({
        schema: {
          type: 'object',
          properties: body,
        },
      }),
    );
  }

  if (role) {
    decorators.push(Auth(role));
  }

  if (permissions) {
    decorators.push(Permissions(...permissions));
  }

  if (guards.length > 0) {
    decorators.push(UseGuards(...guards));
  }
  if (summary) {
    decorators.push(
      ApiOperation({ summary }),
    );
  }
  if (responseType) {
    decorators.push(
      ApiResponse({ type: responseType }),
    );
  }

  return applyDecorators(...decorators);
}
