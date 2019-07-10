import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  suscripcion = new Subscription();

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.suscripcion = this.store.select('ingresoEgreso')
        .subscribe( ingresoEgreso => {
          console.log(ingresoEgreso.items)
          this.items = ingresoEgreso.items;
        })
  }

  borrarItem(uid: string) {
    console.log(uid);
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}
