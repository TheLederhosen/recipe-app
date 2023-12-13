import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { RecipeService } from "./services/recipe.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { OverviewComponent } from "./components/overview/overview.component";
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';
import { SuccessSnackbarComponent } from './components/success-snackbar/success-snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { GlobalErrorHandler } from "./services/global-error-handler/global-error-handler.service";
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { GlobalAuthIntercepterService } from "./services/global-auth-intercepter/global-auth-intercepter.service";

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ViewRecipeComponent,
    CreateRecipeComponent,
    SearchRecipeComponent,
    SuccessSnackbarComponent,
    ErrorModalComponent,
    ConfirmationModalComponent,
    EditRecipeComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    RecipeService, 
    { provide: ErrorHandler, useClass: GlobalErrorHandler }, 
    { provide: HTTP_INTERCEPTORS, useClass: GlobalAuthIntercepterService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
