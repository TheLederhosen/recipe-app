import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OverviewComponent } from "./components/overview/overview.component";

const routes: Routes = [
  { path: "", component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
