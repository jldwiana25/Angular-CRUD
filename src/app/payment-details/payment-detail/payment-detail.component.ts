import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {

  constructor(public service:PaymentDetailService, 
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
    this.service.formData = {
      id: 0,
      ownerName: '',
      cardNumber: '',
      expirationDate: '',
      cvv: ''
    }
  }
  
  onSubmit(form:NgForm){
    if(this.service.formData.id == 0)
    this.insertRecord(form);
    else
    this.updateRecord(form);
  }

  insertRecord(form:NgForm){
    this.service.addPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submited successfully','Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Submited failure','Payment Detail Register')
      }
    )
  }
  updateRecord(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Update successfully','Payment Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
        this.toastr.error('Update failure','Payment Detail Register')
      }
    )
  }
}
