
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Content, Pessoas } from './pessoas';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Content> {
    return this.http.get<Content>(environment.API_URL + '/pessoas');
  }

  salvar(pessoa: Pessoas): Observable<Pessoas> {
    return this.http.post<Pessoas>(environment.API_URL + '/pessoas', pessoa);
  }

  atualizar(idPessoa: number, pessoa: Pessoas): Observable<any> {
    return this.http.put<any>(environment.API_URL + `/pessoas/${idPessoa}`, pessoa);
  }

  deletar(idPessoa: number): Observable<any> {
    return this.http.delete<any>(environment.API_URL + `/pessoas/${idPessoa}`);
  }

  listarPessoasFiltroPorNome(nome: string): Observable<Content> {
    return this.http.get<Content>(environment.API_URL + `/pessoas?nome=${nome}`);
  }

}
