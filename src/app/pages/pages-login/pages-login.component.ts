import {Component, ElementRef, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {ToastrService} from "ngx-toastr";
import {ValidateInput} from "../../helper/helper";
import {UserService} from "../../services/service/user.service";
import {Router} from "@angular/router";
import {Store} from "../../services/auth/store";
import {AUTH} from "../../services/auth/constants";
// @ts-ignore
import * as forge from 'node-forge';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
  user: User = new User();

  constructor(
    private el: ElementRef,
    private toaster: ToastrService,
    private userService: UserService,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(userForm: any) {
    //Check the validations
    if (ValidateInput(userForm, this.el, this.toaster)) {

      if(this.user.username === "sasika.bandara" && this.user.password === "123"){
        //If validated navigate to the dashboard
        this.router.navigate(['/dashboard']);

        this.toaster.success('You have been logged successfully.', 'Login Successful!',{
          closeButton: true,
        });
      }else{
        this.toaster.error('Please provide valid details.', 'Login Unsuccessful!',{
          closeButton: true,
        });
      }

    }
  }

}
