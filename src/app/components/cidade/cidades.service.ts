import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Content, Cidades } from './cidades';

@Injectable({
  providedIn: 'root'
})
export class CidadesService {

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Cidades[]> {
    return this.http.get<Cidades[]>(environment.API_URL + '/cidades');
  }

  salvar(cidade: Cidades): Observable<Cidades> {
    return this.http.post<Cidades>(environment.API_URL + '/cidades', cidade);
  }

  atualizar(idCidade: number, cidade: Cidades): Observable<any> {
    return this.http.put<any>(environment.API_URL + `/cidades/${idCidade}`, cidade);
  }

  deletar(idCidade: number): Observable<any> {
    return this.http.delete<any>(environment.API_URL + `/cidades/${idCidade}`);
  }

  listarCidadesFiltroPorNome(nome: string): Observable<Cidades[]> {
    return this.http.get<Cidades[]>(environment.API_URL + `/cidades?nome=${nome}`);
  }

}
