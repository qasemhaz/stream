import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/category.service';
import { MovieService } from 'src/app/movie.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  @ViewChild('createcategory') Create: any;
  @ViewChild('updatecategory') Update: any;
  @ViewChild('deletecategory') Delete: any;
  CreateCategoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  UpdateCategoryForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
  });



  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @ViewChild(MatSort) sort:any= MatSort;
  displayedColumns: string[] = ['id', 'name', 'fruit'];
  dataSource: any;
  categ:any
  cols: any;

  exportColumns: any;



  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog)
    {
          this.dataSource = new MatTableDataSource();
    }
  async ngOnInit() {
  await  this.categoryService.GetAllCategory()
         // this.mov = this.movieService.GetAllx;
          this.dataSource.data = this.categoryService.GetAllCategoryv
          this.categ = this.categoryService.GetAllCategoryv.map((col:any) => ({ name: col.name }));
          this.cols = [
            { field: 'name', header: 'Name' }
        ];
        this.exportColumns = this.cols.map((col:any) => ({ title: col.header, dataKey: col.field }));



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

  printPage() {
    var table:any=document.getElementById("app");
    var newWin:any= window.open("");
     newWin.document.write(table.outerHTML);
     newWin.print();
    newWin.close();
  }
  exportToExcel ( ): void {
    // generate workbook and add the worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.categ);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'category.xlsx');
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.categ);
            doc.save('products.pdf');
        });
    });
}


  OpenDialog() {
    this.dialog.open(this.Create);
  }
  async CreateCategory() {
    await this.categoryService.insert(this.CreateCategoryForm.value);
    await this.categoryService.GetAllCategory();
    this.dataSource.data = this.categoryService.GetAllCategoryv

  }
  async GetById(categoryid: number) {
    await this.categoryService.GetCategoryById(categoryid);
  }
  async OpenUpdateDialog(categoryid: number) {
    await this.categoryService.GetCategoryById(categoryid);
    this.UpdateCategoryForm.patchValue(this.categoryService.GetCategoryByIdv);
    this.dialog.open(this.Update);
  }

  async UpdateCourse() {
    await this.categoryService.Update(this.UpdateCategoryForm.value);
    await this.categoryService.GetAllCategory();
    this.dataSource.data = this.categoryService.GetAllCategoryv

  }
  selectedItem = 0;
  OpenDeleteDialog(categoryid: number) {
    this.selectedItem = categoryid;
    this.dialog.open(this.Delete);
  }

  async DeleteCourse() {
    await this.categoryService.Delete(this.selectedItem);
    await this.categoryService.GetAllCategory();
    this.dataSource.data = this.categoryService.GetAllCategoryv
  }
}
