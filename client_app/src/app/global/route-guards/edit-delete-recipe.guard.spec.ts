import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { editDeleteRecipeGuard } from './edit-delete-recipe.guard';

describe('editDeleteRecipeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => editDeleteRecipeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
