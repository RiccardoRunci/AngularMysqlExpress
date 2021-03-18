import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ServizioHttpService} from './primo-componente.service';
import { utenti } from './utenti';
@Component({
  selector: 'app-primo-componente',
  templateUrl: './primo-componente.component.html',
  styleUrls: ['./primo-componente.component.css']
})
export class PrimoComponenteComponent implements OnInit {
VariabileListaUtenti$:Observable<utenti[]> | undefined; //$ è una convenzione che significa che la variabile deriva da una funzione Observable.
  constructor(private service: ServizioHttpService) { }

  ngOnInit(): void { }

  VisualizzaUtenti(){
    this.VariabileListaUtenti$=this.service.ListaUtenti();
    this.VariabileListaUtenti$.subscribe( //errori,risposte e completamento
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'));
  }
  
  InserisciUtente(NomeUtente:string,EmailUtente:string){
    this.service.InserisciUtente(NomeUtente,EmailUtente);
  }
  
  VisualizzaUtente(id:string){
    var idNumber = Number(id); //cast da string a number
    this.VariabileListaUtenti$=this.service.UtentePerId(idNumber);
    } 
}