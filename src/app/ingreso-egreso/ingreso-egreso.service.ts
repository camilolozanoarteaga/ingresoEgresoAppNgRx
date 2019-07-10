import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription()
  ingresoEgresoItemsSubscription: Subscription = new Subscription()

  constructor(private afDB: AngularFirestore,
              private authService: AuthService,
              private store: Store<AppState>
              ) { }

  initIngresoEgresoListener() {

    this.ingresoEgresoListenerSubscription= this.store.select('auth')
        .pipe(
          filter( auth => auth.user != null )
        )
        .subscribe( auth => this.ingresoEgresoItems(auth.user.uid));

  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubscription= this.afDB.collection(`${uid}/ingreso-egreso/items`)
             .snapshotChanges()
             .pipe(
               map(docData => {
                 return docData.map(doc => {
                   return {
                     uid: doc.payload.doc.id,
                     ...doc.payload.doc.data()
                   }
                 })
               })
             )
             .subscribe( (collection: any[]) => {
               console.log(collection);
               this.store.dispatch(new SetItemsAction(collection));
             });
  }

  cancelarSubscription() {

    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();

  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const user = this.authService.getUsuario();

    return this.afDB.doc(`${user.uid}/ingreso-egreso`)
        .collection('items').add({...ingresoEgreso});

  }



}
