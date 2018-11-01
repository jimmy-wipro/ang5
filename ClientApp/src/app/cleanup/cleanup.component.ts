import { Component, OnInit, Inject } from '@angular/core';
import { Product} from '../fetch-data/fetch-data.component';
import { HttpClient } from '@angular/common/http';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-cleanup',
  templateUrl: './cleanup.component.html',
  styleUrls: ['./cleanup.component.css']
})
export class CleanupComponent implements OnInit {
  public products: Product[];
  public cleanedData: object[];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router:Router) {
    this.FetchData();
  }

  FetchData() {
    this.http.get<Product[]>(this.baseUrl + 'api/Products').subscribe(result => {
      this.products = result;
      // Remove the duplicate elements
      let uniqueArray = this.products.map(x=>x.name.toLowerCase()).filter(function (el, index, array) {
        return  array.indexOf(el) == index;
      });
      let dict = [];
      uniqueArray.forEach(function (x, i) {
        let count = this.products.filter(y => y.name.toLowerCase() == x.toLowerCase()).length;
        if(count>1)
        dict.push({ name: x, count: count})
      },this);
      var count = this.products.map(x => x.name).length;
      
      this.cleanedData = dict;
      console.log(this.cleanedData);
    }, error => console.error(error));
  }

  Edit(data: Dict) {
    var first = this.products.find(x => x.name.toLowerCase() == data.name.toLowerCase());
    this.router.navigate(['/form/'+first.id])
    console.log(first);

  }

  ngOnInit() {
  }

}

class Dict {
  name: string;
  count: number;
}
