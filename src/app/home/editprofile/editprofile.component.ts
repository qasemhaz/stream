import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription, debounceTime } from 'rxjs';
import { MovieService } from 'src/app/movie.service';
import { UserService } from 'src/app/user.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})

export class EditprofileComponent {


  displayedColumns: string[] = ['id', 'name', 'rate', 'fruit'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @ViewChild(MatSort) sort:any= MatSort;

  constructor(public movieService: MovieService) {

    this.dataSource = new MatTableDataSource();
  }
  mov:any
  cols: any;

  exportColumns: any;

 async ngOnInit() {

     await  this.movieService.GetAllMovie()
          this.mov = this.movieService.GetAllx;
          this.dataSource.data = this.movieService.GetAllx


      this.cols = [
          { field: 'name', header: 'Name' },
          { field: 'categoryid', header: 'Category' },
          { field: 'quantity', header: 'Quantity' }
      ];

      this.exportColumns = this.cols.map((col:any) => ({ title: col.header, dataKey: col.field }));
  }
  printPage() {
    var table:any=document.getElementById("app");
    var newWin:any= window.open("");
     newWin.document.write(table.outerHTML);
     newWin.print();
    newWin.close();
  }
  public exportToExcel ( ): void {
    // generate workbook and add the worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.mov);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'cccc.xlsx');
  }
  exportPdf() {
      import('jspdf').then((jsPDF) => {
          import('jspdf-autotable').then((x) => {
              const doc = new jsPDF.default('p', 'px', 'a4');
              (doc as any).autoTable(this.exportColumns, this.mov);
              doc.save('products.pdf');
          });
      });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


