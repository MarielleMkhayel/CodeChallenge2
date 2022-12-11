import { SetMetadata } from '@nestjs/common';

export const isAdmin = (roles: boolean) => SetMetadata('roles', roles);