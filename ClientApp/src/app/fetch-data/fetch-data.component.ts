import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public products: Product[];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.FetchData();
  }
  Edit(prodcuctCode:string) {
    console.log(prodcuctCode);
  }

  FetchData() {
    this.http.get<Product[]>(this.baseUrl + 'api/Products').subscribe(result => {
      this.products = result;
    }, error => console.error(error));
  }

  Delete(prodcuctCode: string) {
    console.log(prodcuctCode);
    this.http.delete(this.baseUrl + 'api/Products/'+prodcuctCode).subscribe(result => {
      console.log(result);
      this.FetchData();
    }, error => console.error(error));
  }
}

export interface Product {
  id: number;
  name: string;
  url: string;
  code: string;
}
