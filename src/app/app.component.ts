import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  info: any;
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 10;
  hasChecker: string = 'all';
  filterTitle: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

 constructor(private http:HttpClient){
 }

 ngOnInit(): void {
   this.getAllData()
 }
 getAllData(){

  let queryParams= new HttpParams()

  .set('page', this.currentPage.toString())
  .set('page_size', this.pageSize.toString())
 .set('sort_by', 'id')  
    .set('sort_order', this.sortOrder); 

     

  if (this.hasChecker !== 'all') {
    queryParams = queryParams.set('has_checker', this.hasChecker);
  }

  if (this.filterTitle) {
    queryParams = queryParams.set('title', this.filterTitle);
  }

  if (this.sortOrder) {
    queryParams = queryParams.set('sort_order', this.sortOrder);
  }
  
  

  this.http.get<any>('https://kep.uz/api/problems', { params: queryParams }).subscribe((res) => {
    this.info = res.data;
    this.totalPages = Math.ceil(res.total / this.pageSize);
    console.log(this.info);
  });

}

onPageChange(pageNumber: number) {
  if (pageNumber < 1 || pageNumber > this.totalPages) {
    return; 
  }
  this.currentPage = pageNumber;
  this.getAllData();
}

onPageSizeChange() {
  this.currentPage = 1; 
  this.getAllData();
}

onHasCheckerChange() {
  this.currentPage = 1;
  this.getAllData();
}

applyFilters() {
  this.currentPage = 1; 
  this.getAllData();
}


toggleSortOrder(order: 'asc' | 'desc') {
  this.sortOrder = order;
  this.getAllData();
  if (this.sortOrder === 'desc') {
    this.currentPage = this.totalPages; 
  } else {
    this.currentPage = 1; 
  }
}
}
