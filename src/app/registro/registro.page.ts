import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { CpfValidator } from '../validators/cpf-validator';
import { ComparaValidator } from '../validators/comparacao-validator';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegistro: FormGroup;

public mensagens_validacao = {
  nome:[
    {tipo: 'required', mensagem: 'O campo nome é obrigatório'},
    {tipo: 'minLength', mensagem: 'O nome deve ter pelo menos 3 caracteres'}
  ],
  cpf: [
    {tipo: 'required', mensagem: 'O campo cpf é obrigatório'},
    {tipo: 'minLength', mensagem: 'O cpf deve ter pelo menos 11 caracteres'},
    {tipo: 'maxLength', mensagem: 'O cpf deve ter no máximo 14 caracteres'},
    {tipo: 'invalido', mensagem: 'cpf invalido'}
  ],
  data:[
    {tipo: 'required', mensagem: 'O campo data é obrigatório'},
  ],
  genero: [
    {tipo: 'required', mensagem: 'O campo senha é obrigatório'},
  ],
  celular: [
    {tipo: 'minLength', mensagem: 'O celular deve ter pelo menos 10 caracteres'},
    {tipo: 'maxLength', mensagem: 'O celular deve ter no máximo 16 caracteres'}
  ],
  email: [
    {tipo: 'required', mensagem: 'O campo email é obrigatório'},
    {tipo: 'email', mensagem: 'o Email é inválido'}
  ],
  senha: [
    {tipo: 'required', mensagem: 'O campo senha é obrigatório'},
    {tipo: 'minLength', mensagem: 'A senha deve ter pelo menos 6 caracteres'}
  ],
  confirmar: [
    {tipo: 'required', mensagem: 'O campo confirmar senha é obrigatório'},
    {tipo: 'minLength', mensagem: 'A senha deve ter pelo menos 6 caracteres'},
    {tipo: 'comparacao', mensagem: 'deve ser igual a senha'}
  ]
  
};
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private usuariosService: UsuariosService,
    public alertController: AlertController,
    
    ) { 
    this.formRegistro = formBuilder.group({

      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(14),
                CpfValidator.cpfValido
      ])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(16)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmar: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    }, {
    
     validator: ComparaValidator('senha', 'confirma')
    });
  }

  async ngOnInit() {
    this.usuariosService.buscarTodos();
    console.log(this.usuariosService.listaUsuarios);
  }

public async salvarFormulario(){
  if(this.formRegistro.valid){

let usuario = new Usuario();
usuario.nome =this.formRegistro.value.nome;
usuario.cpf = this.formRegistro.value.cpf;
usuario.dataNascimento = new Date(this.formRegistro.value.dataNascimento);
usuario.genero = this.formRegistro.value.genero;
usuario.celular = this.formRegistro.value.celular;
usuario.email = this.formRegistro.value.email;
usuario.senha = this.formRegistro.value.senha;

if(await this.usuariosService.salvar(usuario)) {
  this.exibirAlerta('SUCESSO', 'Usuario salvo com sucesso');
  this.router.navigateByUrl('/login');
} else {
  this.exibirAlerta('ERRO', 'erro ao salvar');
}

  } else {
  this.exibirAlerta('ADVERTENCIA', 'Formulario invalido<br/>Verifique os campos do seu formulario');
  }
}

   async exibirAlerta(titulo: string, mensagem: string){
     const alert = await this.alertController.create({
       header: 'titulo',
       message: mensagem,
       buttons: ['OK']
     });

     await alert.present();
   }
  }


