import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UiModule } from '@onic-a/ui'; // Asegúrate de que la ruta sea correcta
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';



@Component({
  imports: [RouterModule,UiModule, ReactiveFormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'onic-a';
  form = new FormGroup({
    name: new FormControl(''),
  });
}
