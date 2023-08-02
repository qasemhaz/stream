import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/category.service';
import { MovieService } from 'src/app/movie.service';
import { SourceService } from 'src/app/source.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @ViewChild('createmovie') Create: any;
  @ViewChild('updatemovie') Update: any;
  @ViewChild('deletemovie') Delete: any;
  @ViewChild('createSources') creatSources  : any;

  CreateSourceForm = new FormGroup({
    video: new FormControl('',Validators.required),
    quality : new FormControl('',Validators.required),
    player: new FormControl('', Validators.required),
    languagee: new FormControl('', Validators.required),
    dateadded: new FormControl(Date.now),
    movieid: new FormControl(0),


  });
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
  mov:any
  cols: any;

  exportColumns: any;
  constructor(
    public categoryService: CategoryService,    public movieService: MovieService,
    public dialog: MatDialog,public sourceService: SourceService
  )
  {
              this.dataSource = new MatTableDataSource();
  }
  async ngOnInit() {
    await this.categoryService.GetAllCategory();
    await this.movieService.GetAllMovie();
    await this.sourceService.GetAllSource();

    this.dataSource.data = this.movieService.GetAllx
          this.mov = this.movieService.GetAllx.map((col:any) => ({ name: col.name, rate: col.rate, duraation: col.duraation,
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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.mov);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'movie.xlsx');
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.mov);
            doc.save('movie.pdf');
        });
    });
}


uploadd(input:any){

  {

    if(input.files.length !=0 )
    {
    let uploadedFile = input.files[0] // imagefile
    let formData = new FormData()
    formData.append('file' , uploadedFile)
    this.sourceService.UploadVideo(formData)
    this.CreateSourceForm.controls.video.setValue(this.sourceService.videoName)

    }
    }
  }

  upload(input:any){

    {

      if(input.files.length !=0 )
      {
      let uploadedFile = input.files[0] // imagefile
      let formData = new FormData()
      formData.append('file' , uploadedFile)
      this.movieService.UploadImage(formData)
      this.UpdateForm.controls.image.setValue(this.movieService.imageName)

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
        this.movieService.UploadImage(formData)
        this.CreateForm.controls.image.setValue(this.movieService.imageName)

        }
        }
      }
  OpenDialog() {
    this.dialog.open(this.Create);
  }
  async CreateMovie() {
    await this.movieService.insert(this.CreateForm.value);
    await this.movieService.GetAllMovie();
    this.dataSource.data = this.movieService.GetAllx

  }


  async GetById(id: number) {
    await this.movieService.GetMovieById(id);
  }
  async OpenUpdateDialog(id: number) {
    await this.movieService.GetMovieById(id);
    this.UpdateForm.patchValue(this.movieService.GetxById);
    this.dialog.open(this.Update);
  }

  async UpdateMovie() {
    await this.movieService.Update(this.UpdateForm.value);
    await this.movieService.GetAllMovie();
    this.dataSource.data = this.movieService.GetAllx

  }
  selectedItem = 0;
  OpenDeleteDialog(id: number) {
    this.selectedItem = id;
    this.dialog.open(this.Delete);
  }

  async DeleteMovie() {
    await this.movieService.Delete(this.selectedItem);
    await this.movieService.GetAllMovie();
    this.dataSource.data = this.movieService.GetAllx

  }

  async OpenSourceDialog(id:number) {
   await this.CreateSourceForm.controls.movieid.setValue(id)
   await this.dialog.open(this.creatSources);
  }
  async CreatSource() {
    await this.sourceService.insert(this.CreateSourceForm.value);
  }
}
