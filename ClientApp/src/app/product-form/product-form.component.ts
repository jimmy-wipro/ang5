import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/Forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  myform: FormGroup;
  name: FormControl;
  url: FormControl;
  code: FormControl;

  id: number;

  dupe: boolean;
  reg:string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute, private router:Router) {
    this.route.params.subscribe(params => this.id=params['id']); 
  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
    if (this.id) {
      console.log('getting data...');
      this.http.get<IProduct>(this.baseUrl + 'api/Products/'+this.id).subscribe(result => {
        console.log(result);
       this.myform.controls['name'].setValue(result.name);
        this.myform.controls['url'].setValue(result.url);
        this.myform.controls['code'].setValue(result.code);
      }, error => console.error(error));
    }
  }
  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.url = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
    this.code = new FormControl('', Validators.required);

  }

  createForm() {
    this.myform = new FormGroup({
      url: this.url,
      code: this.code,
      name: this.name
    });
  }



  Add(product: Product) {

    if (!this.myform.valid) {
      return;
    }

    console.log(this.myform.value);
    this.myform.value.id = this.id;
    this.http.post<Product[]>(this.baseUrl + 'api/Products',this.myform.value).subscribe(result => {
      console.log(result);
      this.router.navigate(['/fetch-data']);
    }, error => {
      console.error(error);
      this.dupe = true;
    }
    );
  }

}

interface IProduct {
  id: number;
  name: string;
  url: string;
  code: string;
}

export class Product {
  constructor(
     id: number,
    name: string,
    url: string,
    code: string,
  ) { }
}
