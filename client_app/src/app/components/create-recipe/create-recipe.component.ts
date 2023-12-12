import { Component, OnInit, HostListener, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray }
  from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeService } from 'src/app/services/recipe.service';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {
  maxRows = 0;

  form = this.fb.group({
    "title": ["", Validators.required],
    "description": ["", Validators.required],
    ingredients: this.fb.array([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ])
  });

  @Output() formValidEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.resize()

    // Subscribe to form value changes
    this.form.valueChanges.subscribe(() => {
      // Check form validity and trigger an event if the form is valid
      if (this.form.valid) {
        document.getElementById("form-button")?.removeAttribute("disabled");
      } else {
        document.getElementById("form-button")?.setAttribute("disabled", "disabled");
      }
    });
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
    control.push(new FormControl('', Validators.required));
  }

  removeIngredientItem(index: number) {
    const control = this.form.controls.ingredients as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      const title = this.form.controls.title.value !== null ? this.form.controls.title.value : "";
      const description = this.form.controls.description.value !== null ? this.form.controls.description.value : ""
      const ingredients = this.form.controls.ingredients.value.filter((item): item is string => item !== null);

      this.recipeService.postRecipe(title, description, ingredients).subscribe({
        next: () => {
          this.form.reset({}, { emitEvent: false });

          Object.keys(this.form.controls).forEach(controlName => {
            const control = this.form.get(controlName);

            if (control instanceof FormArray) {
              control.controls.forEach(control => {
                control.clearValidators();
                control.updateValueAndValidity();
              });
            } else if (control) {
              control.clearValidators();
              control.updateValueAndValidity();
            }
          });

          this.openSuccessSnackBar();
        }
      });
    }
  }

  openSuccessSnackBar() {
    this._snackBar.openFromComponent(SuccessSnackbarComponent, {
      data: "Recipe successfully created!",
      duration: 5 * 1000,
    });
  }
}