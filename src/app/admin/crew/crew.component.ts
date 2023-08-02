import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/category.service';
import { CrewService } from 'src/app/crew.service';
import { CrewseriesmovieService } from 'src/app/crewseriesmovie.service';
import { MovieService } from 'src/app/movie.service';
import { RoleService } from 'src/app/role.service';
import { SeriesService } from 'src/app/series.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent {
  @ViewChild('createcrew') Create: any;
  @ViewChild('updatecrew') Update: any;
  @ViewChild('deletecrew') Delete: any;

  @ViewChild('ajob') addjob: any;
  @ViewChild('addmo') addmov: any;
  @ViewChild('addse') addser: any;
  @ViewChild('deletem') Deletemov: any;
  @ViewChild('deletes') Deleteser: any;

  CreateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image : new FormControl('',Validators.required),
    descip: new FormControl('', Validators.required),
    facebook: new FormControl('', Validators.required),
    twiter: new FormControl('', Validators.required),
    instagram: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    placeofbirth: new FormControl('', Validators.required),
    roleid: new FormControl('', Validators.required),


  });
  UpdateForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    image : new FormControl('',Validators.required),
    descip: new FormControl('', Validators.required),
    facebook: new FormControl('', Validators.required),
    twiter: new FormControl('', Validators.required),
    instagram: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    placeofbirth: new FormControl('', Validators.required),
    roleid: new FormControl('', Validators.required),
  });

  AddM = new FormGroup({
    movieid: new FormControl('', Validators.required),
    seriesid : new FormControl(null),
    crewid: new FormControl(0),
  });
  Adds = new FormGroup({
    movieid: new FormControl(null),
    seriesid : new FormControl('',Validators.required),
    crewid: new FormControl(0),
  });

  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @ViewChild(MatSort) sort:any= MatSort;
  displayedColumns: string[] = ['id', 'name', 'rate', 'age', 'roleid', 'image', 'birth', 'fruit'];
  dataSource: any;
  cre:any
  cols: any;

  exportColumns: any;

  constructor(
    public crewService: CrewService,
    public dialog: MatDialog,public roleService: RoleService,public movieService: MovieService
    ,public crewseriesmovieService: CrewseriesmovieService,public seriesService: SeriesService
  ) {          this.dataSource = new MatTableDataSource();
  }
  async ngOnInit() {
    await this.crewService.GetAllCrew();
    await this.roleService.GetAllRole();
    await this.crewseriesmovieService.GetAllMovieSeriesCrew();
    await this.movieService.GetAllMovie();
    await this.seriesService.GetAllSeries();


    this.dataSource.data = this.crewService.GetAllx
    this.cre = this.crewService.GetAllx.map((col:any) => ({ name: col.name,age: col.age,birthdate: col.birthdate,placeofbirth: col.placeofbirth,
      roleid: col.roleid,image: col.image }));
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
      { field: 'birthdate', header: 'Birthdate' },
      { field: 'placeofbirth', header: 'Placeofbirth' },
      { field: 'roleid', header: 'Roleid' },
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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.cre);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'crew.xlsx');
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.cre);
            doc.save('crew.pdf');
        });
    });
}











  upload(input:any){

    {

      if(input.files.length !=0 )
      {
      let uploadedFile = input.files[0] // imagefile
      let formData = new FormData()
      formData.append('file' , uploadedFile)
      this.crewService.UploadImage(formData)
      this.UpdateForm.controls.image.setValue(this.crewService.imageName)

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
        this.crewService.UploadImage(formData)
        this.CreateForm.controls.image.setValue(this.crewService.imageName)

        }
        }
      }

  OpenDialog() {
    this.dialog.open(this.Create);
  }
  async CreateCrew() {
    await this.crewService.insert(this.CreateForm.value);
    await this.crewService.GetAllCrew();
    this.dataSource.data = this.crewService.GetAllx

  }


  async GetById(id: number) {
    await this.crewService.GetCrewById(id);
  }
  async OpenUpdateDialog(id: number) {
    await this.crewService.GetCrewById(id);
    this.UpdateForm.patchValue(this.crewService.GetxById);
    this.dialog.open(this.Update);
  }

  async UpdateCrew() {
    await this.crewService.Update(this.UpdateForm.value);
    await this.crewService.GetAllCrew();
    this.dataSource.data = this.crewService.GetAllx

  }
  selectedItem = 0;
  OpenDeleteDialog(id: number) {
    this.selectedItem = id;
    this.dialog.open(this.Delete);
  }

  async DeleteCrew() {
    await this.crewService.Delete(this.selectedItem);
    await this.crewService.GetAllCrew();
    this.dataSource.data = this.crewService.GetAllx

  }
x=0
  async OpenjobDialog(id:number) {
    this.x=id
    await this.crewService.GetCrewById(id);
    this.dialog.open(this.addjob);
  }





  async OpenAddMDialog() {
    await this.crewService.GetCrewById(this.x);
    this.AddM.controls.crewid.setValue(this.x)
    this.dialog.open(this.addmov);
  }
  async Createmo() {
    await this.crewseriesmovieService.insert(this.AddM.value);
    await this.crewseriesmovieService.GetAllMovieSeriesCrew();
  }

  async OpenAddSDialog() {
    await this.crewService.GetCrewById(this.x);
    this.Adds.controls.crewid.setValue(this.x)
    this.dialog.open(this.addser);
  }
  async CreateSe() {
    await this.crewseriesmovieService.insert(this.Adds.value);
    await this.crewseriesmovieService.GetAllMovieSeriesCrew();
  }


  selectItem = 0;


 async OpenDeletemo(id:number) {

  this.selectItem = id;
  this.dialog.open(this.Deletemov);


  }

  async DeleteCrewM() {

    await this.crewseriesmovieService.Delete(this.selectItem);
    this.crewseriesmovieService.GetAllMovieSeriesCrew();


  }

  async OpenDeletese(id:number) {
    this.selectItem = id;
    this.dialog.open(this.Deleteser);

  }

  async DeleteCrewS() {

    await this.crewseriesmovieService.Delete(this.selectItem);
    this.crewseriesmovieService.GetAllMovieSeriesCrew();


  }

  getItems() {
    return this.roleService.GetAllx.filter((item:any) => item.id > 3);
  }
}
