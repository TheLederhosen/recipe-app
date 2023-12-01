import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDto } from '../../global/recipe-dto';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { ConfirmationDialogDto } from 'src/app/global/confirmationDialogDto';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss'],
})
export class ViewRecipeComponent implements OnInit {

  recipe: RecipeDto = {
    id: 0,
    userId: 0,
    title: "",
    description: "",
    ingredients: []
  };

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => this.recipeService.getRecipebyId(params["id"])
        .subscribe((recipe) => {
          console.log(recipe)
          this.recipe = recipe;
        }))

  }

  deleteRecipe() {
    const dataDto: ConfirmationDialogDto = {
      message: "Are you sure you want to delete this recipe ?",
      action: "Delete",
      confirmed: false
    };

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: dataDto,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (dataDto.confirmed) {
        this.recipeService.deleteRecipeById(this.recipe.id).subscribe({
          next: res => {
            this.openSuccessSnackBar();
            this.router.navigate(['']);
          }, 
          error: err => {
            console.error(err);
            this.openDialog(err.error);
            return;
          }
        })
      }
    });
  }

  openSuccessSnackBar() {
    this._snackBar.openFromComponent(SuccessSnackbarComponent, {
      data: "Recipe successfully deleted!",
      duration: 5 * 1000,
    });
  }

  openDialog(errorMessage: string): void {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      data: errorMessage,
      autoFocus: false
    });
  }

}