import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData:PaymentDetail
  readonly rootURL = 'https://localhost:5051/PaymentDetail';
  list:any;
  listData : PaymentDetail [];

  constructor(private http:HttpClient) { }

  addPaymentDetail(){
    return this.http.post(this.rootURL+'/AddPayment',this.formData)
  }
  putPaymentDetail(){
    return this.http.put(this.rootURL+'/UpdatePayment/'+this.formData.id, this.formData)
  }
  deletePaymentDetail(id){
    return this.http.delete(this.rootURL+'/'+id)
  }

  refreshList(){
    this.http.get(this.rootURL+'/inquiry/0/100').subscribe(res => {
      console.log('res', res);
      this.list=res;
      this.listData=this.list.data;
    })
    // .toPromise()
    // .then(res => this.data = res as PaymentDetail [] )
  }
}
