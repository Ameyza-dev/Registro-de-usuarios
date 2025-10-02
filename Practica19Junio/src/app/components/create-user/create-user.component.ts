import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  id: any | null;
  titulo = 'Agregar usuario';

  subcription: Subscription[] = []

  constructor(public fb: FormBuilder,
              public UserService: UserService,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');

    this.subcription.push(
      this.UserService.updateUser.subscribe(user => {
        console.log("LLEGARON LOS DATOS", user)
        this.userForm.setValue({
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          password: user.password
        });
      }));
  }

  ngOnInit(): void {
    this.isUpdate();
  }

  saveOrUpdate(): void {
    if (this.id == null) {
      this.save();
    } else {
      this.update(this.id);
    }
  }

  save(): void {
    this.UserService.createUser(this.userForm.value).subscribe(response => {
        //this.userForm.reset();
        this.router.navigate(['list-user'])
      },
      error => {
        console.error(error)
      }
    );
  }

  isUpdate() {
    if (this.id !== null) {
      this.titulo = 'Editar usuario';
      /*this.UserService.getUser(this.id).subscribe(response => {
        //console. log( response. name);

      });*/
    }
  }

  update(id: any) {
    const user: any = {
      name: this.userForm.value.name,
      last_name: this.userForm.value.last_name,
      email: this.userForm.value.email,
      password: this.userForm.value.password
    };
    this.UserService.updateUsers(id, user).subscribe(response => {
        this.router.navigate(['list-user']);
      },
      //error =>{
      //console.error()
      //}
    );

  }

  ngOnDestroy() {
    this.subcription.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
