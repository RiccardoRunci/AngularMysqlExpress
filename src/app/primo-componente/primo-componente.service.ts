import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import {utenti} from './utenti';
import {catchError,tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServizioHttpService {
  constructor(private http:HttpClient) { }

  ListaUtenti():Observable<utenti[]>{ //observable perchè è una funzione asincrona
    return this.http.get<utenti[]>('/api/utenti',{responseType:"json"}).pipe(
      tap((_)=>console.log('OK!')));
  }

  InserisciUtente(NomeUtente:string, EmailUtente:string) 
  {
    var InserisciUt = '/api/inserisciutente';
    this.http.post(
      InserisciUt,
      {
        'nomeUt': NomeUtente,
        'emailUt': EmailUtente
      }
    ).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  UtentePerId(Id:number):Observable<utenti[]>
  {
    return this.http.get<utenti[]>('/api/utenti/'+Id,{responseType:"json"}).pipe(tap());
  }


}
