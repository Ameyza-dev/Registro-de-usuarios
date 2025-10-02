import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {AddressService} from "../../services/address.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: any;

  constructor(private userService: UserService, private router: Router, private addressService: AddressService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(response => {
        this.users = response;
        //console.log(response);
      },
      error => {
        console.error(error)
      });
  }

  delete(users: any) {
    this.userService.deleteUser(users.id).subscribe(response => {
        if (response.deleted == true) {
          this.users.pop(users);
        }
      }
    );
  }

  select(user: any): void {
    this.router.navigate(['update-user/' + user.id]).then((): void => {
      console.log(user);
      this.userService.updateUser.next(user)
    })
    //this.route.redirectTo="create-user"
  }

  showAddress(user: any) {
    this.router.navigate(['create-address/' + user.id]).then((): void => {
      console.log(user);
      this.addressService.updateAddress.next(user)
    })
  }
}
