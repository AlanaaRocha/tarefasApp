import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
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
    {tipo: 'maxLength', mensagem: 'O cpf deve ter no máximo 14 caracteres'}
  ],
  data:[
    {tipo: 'required', mensagem: 'O campo data é obrigatório'},
  ],
  genero: [
    {tipo: 'required', mensagem: 'O campo senha é obrigatório'},
  ],
  celular: [
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
    {tipo: 'minLength', mensagem: 'A senha deve ter pelo menos 6 caracteres'}
  ]
  
};
  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.formRegistro = formBuilder.group({
      nome:['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf:['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14)])],
      data:['', Validators.compose([Validators.required])],
      genero:['', Validators.compose([Validators.required])],
      celular:['', Validators.compose([Validators.maxLength(16)])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      senha:['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmar:['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }
    public registro(){
      if (this.formRegistro.valid) {
        console.log('formulario válido');
        this.router.navigateByUrl('/home');
      }else{
        console.log('formulário inválido')
      }
  }

}
