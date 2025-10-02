import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AddressService} from "../../services/address.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit, OnDestroy {

  address: any;


  userId = 0;

  deshabilitarCajas: boolean = true;
  addressForm: FormGroup;
  id: any | null;
  titulo = 'Agregar direccion';
  id_usuario = 0;

  subcription: Subscription[] = []


  constructor(private fb: FormBuilder, private addressService: AddressService, private router: Router) {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      numer: ['', Validators.required],
      cp: ['', Validators.required],
      addressReferences: ['', Validators.required]
    })
    
    this.subcription.push(
      this.addressService.updateAddress.subscribe(user => {
        console.log("LLEGARON LOS DATOS", user)
        this.userId = user.id;
        this.addressForm.patchValue({
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          password: user.password
        });
      }));
  }

  ngOnInit(): void {
    // @ts-ignore
   this.llenarTablaAddress();
    this.isUpdate();
  }

  llenarTablaAddress()
  {
    this.addressService.getAllAddress(this.userId).subscribe(response => {
      this.address = response;
      console.log("Hola" + this.address);
    },
    error => {
      console.error(error)
    });
  }

  saveOrUpdate() {
    if (this.id !== null) {
      this.save();
    } else {
      this.update(this.id);
    }
  }

  save(): void {
    let body = this.addressForm.value;
    body.user_id = this.userId;
    console.log(body);
    this.addressService.createAddress( this.userId,this.addressForm.value).subscribe(response => {
        //this.userForm.reset();;
        this.llenarTablaAddress();
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
    const address: any = {
      country: this.addressForm.value.name,
      state: this.addressForm.value.state,
      city: this.addressForm.value.city,
      numer: this.addressForm.value.numer,
      cp: this.addressForm.value.cp,
      addressReferences: this.addressForm.value.addressReferences
    };
    this.addressService.updateAdrress(id, address).subscribe(response => {
       this.llenarTablaAddress();
      },
    );
  }

  ngOnDestroy() {
    this.subcription.forEach(subs => {
      subs.unsubscribe();
    });
  }


  /**/
  delete(address: any) {
    this.addressService.deleteAddress(address.id).subscribe(response => {
       
         this.llenarTablaAddress()
      
      }
    );
  }

  select(address: any): void {
    this.router.navigate(['create-address/' + address.id]).then((): void => {
      console.log(address);
      this.addressService.updateAddress.next(address)
    })
    //this.route.redirectTo="create-user"
  }

}
