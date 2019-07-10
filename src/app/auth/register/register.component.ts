import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription = new Subscription();

  constructor(private afAuth: AuthService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  onSubmit( data: any ) {
    this.afAuth.crearUsuario(data.nombre, data.email, data.password);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
