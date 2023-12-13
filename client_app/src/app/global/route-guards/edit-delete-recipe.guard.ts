import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const editDeleteRecipeGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).canEdit(route.params['id']);
};
