import { Component, OnInit, HostListener, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray }
  from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeService } from 'src/app/services/recipe.service';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { RecipeDto } from 'src/app/global/recipe-dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent {
  maxRows = 0;

  recipe: RecipeDto = {
    id: 0,
    userId: 0,
    userName: "",
    title: "",
    description: "",
    ingredients: []
  };

  isLoaded: boolean = false;

  form = this.fb.group({
    "title": '',
    "description": '',
    ingredients: this.fb.array([])
  });

  @Output() formValidEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => this.recipeService.getRecipebyId(params["id"])
        .subscribe((recipe) => {
          console.log(recipe)
          this.recipe = recipe;
          this.isLoaded = true;

          this.form = this.fb.group({
            "title": [this.recipe.title, Validators.required],
            "description": [this.recipe.description, Validators.required],
            ingredients: this.fb.array([])
          });
          
          const control = this.form.controls.ingredients as FormArray;
          this.recipe.ingredients.forEach(ingredient => {
            control.push(new FormControl(ingredient.name, Validators.required));
          })

          this.checkValidity();

          // Subscribe to form value changes
          this.form.valueChanges.subscribe(() => {
            // Check form validity and trigger an event if the form is valid
            this.checkValidity();
          });
        })
    );

    this.resize()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resize()
  }

  resize() {
    const lineHeight = 16
    const el = document.getElementById("text")
    let height = el?.getBoundingClientRect().height;
    if (height != undefined) {
      this.maxRows = Math.floor(height / lineHeight) - 2;
    }
  }

  addIngredientItem() {
    const control = this.form.controls.ingredients as FormArray;
    control.push(new FormControl('', [Validators.required, Validators.maxLength(50)]));
  }

  removeIngredientItem(index: number) {
    const control = this.form.controls.ingredients as FormArray;
    control.removeAt(index);
  }

  checkValidity() {
    if (this.form.valid) {
      document.getElementById("form-button")?.removeAttribute("disabled");
    } else {
      document.getElementById("form-button")?.setAttribute("disabled", "disabled");
    }
  }

  isDifferent(title: string, description: string, ingredients: string[]) {
    if (title !== this.recipe.title || description !== this.recipe.description) {
      return true;
    }

    if (this.recipe.ingredients.length != ingredients.length) {
      return true;
    }

    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      if (this.recipe.ingredients[i].name !== ingredients[i]) {
        return true;
      }
    }

    return false;
  }

  getErrorMessage(control: FormControl, field: string) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    return control.hasError('maxlength') ? `${field} is too long!` : '';
  }

  onSubmit() {
    if (this.form.valid) {
      const title = this.form.controls.title.value !== null ? this.form.controls.title.value : "";
      const description = this.form.controls.description.value !== null ? this.form.controls.description.value : ""
      const ingredients = this.form.controls.ingredients.value.filter((item: any): item is string => item !== null);

      if (this.isDifferent(title, description, ingredients)) {
        this.recipeService.updateRecipe(this.recipe.id, title, description, ingredients).subscribe({
          next: () => {
            this.openSuccessSnackBar("Recipe successfully updated!");
            this.router.navigate([`/view/${this.recipe.id}`]);
          }
        })
      } else {
        this.openSuccessSnackBar("Nothing changed!");
        this.router.navigate([`/view/${this.recipe.id}`]);
      }
    }
  }

  openSuccessSnackBar(message: string) {
    this._snackBar.openFromComponent(SuccessSnackbarComponent, {
      data: message,
      duration: 5 * 1000,
    });
  }
}
