import { Pessoas } from './../pessoas';
import { CidadesService } from './../../cidade/cidades.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoBreadcrumb,PoSelectOption,  PoTableColumn, PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { PessoasService } from '../pessoas.service';
import { Cidades } from '../../cidade/cidades';

@Component({
  selector: 'app-pessoas-list',
  templateUrl: './pessoas-list.component.html',
  styleUrls: ['./pessoas-list.component.css']
})
export class PessoasListComponent implements OnInit {
  form!: FormGroup;
  pessoa: Pessoas;

  cidadeSelecionada : Cidades = new Cidades();

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'id',
      label: 'Código',
      type: 'string'
    },
    {
      property: 'nome',
      label: 'Nome',
      type: 'string'
    },
    {
      property: 'cpforcnpj',
      label: 'CPF/CNPJ',
      type: 'string'
    },
    {
      property: 'endereco',
      label: 'Endereço',
      type: 'string'
    },
    {
      property: 'numero',
      label: 'Número',
      type: 'string'
    },
    {
      property: 'bairro',
      label: 'Bairro',
      type: 'string'
    },
    {
      property: 'cep',
      label: 'CEP',
      type: 'string'
    },
    {
      property: 'cidade',
      label: 'Cidade',
      type: 'string'
    },
    {
      property: 'uf',
      label: 'UF',
      type: 'string'
    },
    {
      property: 'telefone',
      label: 'Telefone',
      type: 'string'
    },
    {
      property: 'email',
      label: 'E-mail',
      type: 'string'
    }
  ];

  items: Array<any> = [];
  cidades: Array<PoSelectOption> = [];
  actionsTable = [
    {
      action: this.perguntaEditarPessoa.bind(this),
      label: 'Editar',
      icon: 'po-icon po-icon-edit'
    },
    {
      action: this.perguntaExcluirPessoa.bind(this),
      label: 'Excluir',
      icon: 'po-icon po-icon-delete'
    }
  ];

  cancelarCadastro: PoModalAction = {
    action: () => {
      this.modalSalvarPessoa.close();
    },
    label: 'Cancelar',
    danger: true
  };

  salvarCadastro: PoModalAction = {
    action: () => {
      this.salvarPessoa();
    },
    label: 'Confirmar'
  };

  cancelarCadastroPessoa: PoModalAction = {
    action: () => {
      this.perguntaCancelarEdicao();
    },
    label: 'Cancelar',
    danger: true
  };

  editarCadastroPessoa: PoModalAction = {
    action: () => {
      this.editarPessoa();
    },
    label: 'Confirmar'
  };

  excluirCadastroPessoa: PoModalAction = {
    action: () => {
      this.excluirPessoa();
    },
    label: 'Confirmar'
  };

  cancelarExclusaoPessoa: PoModalAction = {
    action: () => {
      this.cancelarExcluirPessoa();
    },
    label: 'Cancelar',
    danger: true
  };

  @ViewChild(PoModalComponent, { static: true }) modalSalvarPessoa!: PoModalComponent;
  @ViewChild('modalEdicaoPessoa', { static: true }) modalEdicaoPessoa!: PoModalComponent;
  @ViewChild('modalExcluirPessoa', { static: true }) modalExcluirPessoa!: PoModalComponent;

  readonly breadcrump: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Pessoas', link: '/pessoas' }
    ]
  };

  constructor(private service: PessoasService,private cidadeService : CidadesService, private formBuilder: FormBuilder, private poNotification: PoNotificationService) {
    this.pessoa = new Pessoas();
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.listarPessoas();
  }

  iniciarForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      cpforcnpj: [''],
      endereco: [''],
      numero: [''],
      bairro: [''],
      cep: [''],
      cidade: [''],
      uf: [''],
      telefone: [''],
      email: ['', Validators.email]
    });
  }

  listarPessoas(): void {
    this.service.listarTodos().subscribe(res => {
      this.items = res.content;
    });
  }

  listarCidades(): void {
    this.cidades = [];
    this.cidadeService.listarTodos().subscribe(res => {
      this.cidades = res.map(r => {
        return {value: r.id, label: r.nome } as PoSelectOption;
      })
    });
  }

  onQuickSearch(filter: any) {
    filter ? this.searchItems(filter) : this.listarPessoas();
  }

  private searchItems(filter: any) {
    this.service.listarPessoasFiltroPorNome(filter).subscribe(res => {
      this.items = res.content;
    });
  }

  novaPessoa() {
    this.listarCidades();
    this.modalSalvarPessoa.open();
  }

  perguntaExcluirPessoa(pessoa: Pessoas) {
    this.pessoa = pessoa;
    this.modalExcluirPessoa.open();
  }

  excluirPessoa() {
    this.service.deletar(this.pessoa.id).subscribe(
      res => {
        this.poNotification.success('Pessoa excluída com sucesso!');
        this.listarPessoas();
      },
      error => {
        this.poNotification.error('Não foi possível excluir a pessoa!');
      }
    );
    this.modalExcluirPessoa.close();
  }

  cancelarExcluirPessoa() {
    this.modalExcluirPessoa.close();
  }

  perguntaCancelarEdicao() {
    this.modalEdicaoPessoa.close();
    this.ngOnInit();
  }

  salvarPessoa() {
    console.log(this.cidadeSelecionada)
    const pessoa = new Pessoas();
    pessoa.bairro = this.form.get("bairro")?.value;
    pessoa.cep = this.form.get("cep")?.value;
    pessoa.cidadeId = this.form.get("cidade")?.value;
    pessoa.cpforcnpj = this.form.get("cpforcnpj")?.value;
    pessoa.email = this.form.get("email")?.value;
    pessoa.nome = this.form.get("nome")?.value;
    pessoa.uf = this.form.get("uf")?.value;
    pessoa.numero = this.form.get("numero")?.value;
    pessoa.telefone = this.form.get("telefone")?.value;
    pessoa.endereco = this.form.get("endereco")?.value;
    this.service.salvar(pessoa).subscribe(
      res => {
        this.pessoa = res;
        this.poNotification.success('Pessoa salva com sucesso!');
        this.listarPessoas();
      },
      error => {
        this.poNotification.error('Não foi possível salvar a nova pessoa');
      }
    );
    this.modalSalvarPessoa.close();
  }

  perguntaEditarPessoa(pessoa: Pessoas) {
    this.listarCidades();
    this.pessoa = pessoa;
    this.form.patchValue(this.pessoa);
    this.modalEdicaoPessoa.open();
  }

  editarPessoa() {
    this.pessoa = this.form.value;
    this.service.atualizar(this.pessoa.id, this.pessoa).subscribe(
      res => {
        this.pessoa = res;
        this.poNotification.success('Pessoa editada com sucesso!');
        this.listarPessoas();
      },
      error => {
        this.poNotification.error('Não foi possível editar a pessoa');
      }
    );
    this.modalEdicaoPessoa.close();
  }

  limparForm(): void {
    this.form.reset();
  }
}
