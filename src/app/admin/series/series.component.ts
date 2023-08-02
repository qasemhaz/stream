import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { MovieService } from 'src/app/movie.service';
import { SeriesService } from 'src/app/series.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {
  @ViewChild('createseries') Create: any;
  @ViewChild('updateseries') Update: any;
  @ViewChild('deleteseries') Delete: any;
  CreateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image : new FormControl('',Validators.required),
    rate: new FormControl('', Validators.required),
    duraation: new FormControl('', Validators.required),
    productionyear: new FormControl('', Validators.required),
    trailerlink: new FormControl('', Validators.required),
    discreption: new FormControl('', Validators.required),
    categoryid: new FormControl('', Validators.required),

  });
  UpdateForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    image : new FormControl('',Validators.required),
    rate: new FormControl('', Validators.required),
    duraation: new FormControl('', Validators.required),
    productionyear: new FormControl('', Validators.required),
    trailerlink: new FormControl('', Validators.required),
    discreption: new FormControl('', Validators.required),
    categoryid: new FormControl('', Validators.required),
  });

  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @ViewChild(MatSort) sort:any= MatSort;
  displayedColumns: string[] = ['id', 'name', 'rate','duraation','productionyear','trailerlink','image', 'fruit'];
  dataSource: any;
  seri:any
  cols: any;
  exportColumns: any;

  constructor(
    public categoryService: CategoryService,    public seriesService: SeriesService,
    public dialog: MatDialog, private router:Router
  )
  {
    this.dataSource = new MatTableDataSource();

  }
  async ngOnInit() {
    await this.categoryService.GetAllCategory();
    await this.seriesService.GetAllSeries();

    this.dataSource.data = this.seriesService.GetAllx
          this.seri = this.seriesService.GetAllx.map((col:any) => ({ name: col.name, rate: col.rate, duraation: col.duraation,
            productionyear: col.productionyear, trailerlink: col.trailerlink, image: col.image}));
          this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'rate', header: 'Rate' },
            { field: 'duraation', header: 'Duration' },
            { field: 'productionyear', header: 'Productionyear' },
            { field: 'trailerlink', header: 'Trailerlink' },
            { field: 'image', header: 'Image' },


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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.seri);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'series.xlsx');
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.seri);
            doc.save('series.pdf');
        });
    });
}






  OpenDialog() {
    this.dialog.open(this.Create);
  }
  upload(input:any){

    {

      if(input.files.length !=0 )
      {
      let uploadedFile = input.files[0] // imagefile
      let formData = new FormData()
      formData.append('file' , uploadedFile)
      this.seriesService.UploadImage(formData)
      this.UpdateForm.controls.image.setValue(this.seriesService.imageName)

      }
      }
    }
    uploadfile(input:any){

      {

        if(input.files.length !=0 )
        {
        let uploadedFile = input.files[0] // imagefile
        let formData = new FormData()
        formData.append('file1' , uploadedFile)
        this.seriesService.UploadImage(formData)
        this.CreateForm.controls.image.setValue(this.seriesService.imageName)

        }
        }
      }
  async CreateSeries() {
    await this.seriesService.insert(this.CreateForm.value);
    await this.seriesService.GetAllSeries();
    this.dataSource.data = this.seriesService.GetAllx

  }


  async GetById(id: number) {
    await this.seriesService.GetSeriesById(id);
  }
  async OpenUpdateDialog(id: number) {
    await this.seriesService.GetSeriesById(id);
    this.UpdateForm.patchValue(this.seriesService.GetxById);
    this.dialog.open(this.Update);
  }

  async UpdateSeries() {
    await this.seriesService.Update(this.UpdateForm.value);
   await this.seriesService.GetAllSeries();
    this.dataSource.data = this.seriesService.GetAllx

  }
  selectedItem = 0;
  OpenDeleteDialog(id: number) {
    this.selectedItem = id;
    this.dialog.open(this.Delete);
  }

  async DeleteSeries() {
    await this.seriesService.Delete(this.selectedItem);
    await this.seriesService.GetAllSeries();
    this.dataSource.data = this.seriesService.GetAllx

  }

  async  NavigateProfile(id:number){
    await this.seriesService.GetSeriesById(id);
      this.router.navigate(["admin/source"])

    }
}
