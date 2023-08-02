import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { EpisodeService } from 'src/app/episode.service';
import { SeriesService } from 'src/app/series.service';
import { SourceService } from 'src/app/source.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent {
  @ViewChild('createepisode') CreatEpisode: any;
  @ViewChild('updatesource') Update: any;
  @ViewChild('deleteepisode') DeletEpisode: any;
  @ViewChild('createSources') creatSources  : any;

  CreateSourceForm = new FormGroup({
    video: new FormControl('',Validators.required),
    quality : new FormControl('',Validators.required),
    player: new FormControl('', Validators.required),
    languagee: new FormControl('', Validators.required),
    dateadded: new FormControl(Date.now),
    episodeid: new FormControl(0),


  });
  CreateEpisodeForm = new FormGroup({
    seriesid: new FormControl(this.seriesService.GetxById.id,Validators.required),
    episodenum : new FormControl('',Validators.required),

  });

  UpdateSourceForm = new FormGroup({
    id: new FormControl(''),
    video: new FormControl('',Validators.required),
    quality : new FormControl('',Validators.required),
    player: new FormControl('', Validators.required),
    languagee: new FormControl('', Validators.required),
    dateadded: new FormControl(Date.now),
    episodeid: new FormControl(0),


  });


  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @ViewChild(MatSort) sort:any= MatSort;
  displayedColumns: string[] = ['id', 'name', 'rate', 'fruit'];
  dataSource: any;
  epi:any
  cols: any;
  exportColumns: any;
  constructor(
    public sourceService: SourceService,    public episodeService: EpisodeService,
    public dialog: MatDialog,public seriesService: SeriesService
  )
  {
    this.dataSource = new MatTableDataSource();

  }
  async ngOnInit() {
    await this.sourceService.GetAllSource();
    await this.episodeService.GetAllEpisode();
    await this.seriesService.GetAllSeries();

    this.dataSource.data = this.episodeService.GetAllx.filter((value:any) => value.seriesid == this.seriesService.GetxById.id)
    this.epi = this.episodeService.GetAllx.map((col:any) => ({ episodenum: col.episodenum}));
    this.cols = [
      { field: 'episodenum', header: 'Episodenum' },
  ];
  // console.log(this.dataSource.data);
  // console.log('===============');

  // console.log(this.epi);

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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.epi);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'episode.xlsx');
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.epi);
            doc.save('episode.pdf');
        });
    });
}



  OpenDialog() {
    this.dialog.open(this.CreatEpisode);
  }

  async CreatEpisodee() {

    await this.episodeService.insert(this.CreateEpisodeForm.value);
    await this.episodeService.GetAllEpisode();
    this.dataSource.data = this.episodeService.GetAllx.filter((value:any) => value.seriesid == this.seriesService.GetxById.id)

  }
  upload(input:any){

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
    uploadFile(input:any){

      {

        if(input.files.length !=0 )
        {
        let uploadedFile = input.files[0] // imagefile
        let formData = new FormData()
        formData.append('file' , uploadedFile)
        this.sourceService.UploadVideo(formData)
        this.UpdateSourceForm.controls.video.setValue(this.sourceService.videoName)

        }
        }
      }
 async OpenSourceDialog(id:number) {
    this.CreateSourceForm.controls.episodeid.setValue(id)
    this.dialog.open(this.creatSources);
  }
  async CreatSource() {
    await this.sourceService.insert(this.CreateSourceForm.value);
  }

x:number=0
  async OpenUpdateSourceDialog(id: number) {
    await this.sourceService.GetAllx.forEach( (value:any) => {
      if(value.episodeid==id){
        this.x= value.id
      }
    });
    await this.sourceService.GetSourceById(this.x);
    this.UpdateSourceForm.controls.episodeid.setValue(id)
    this.UpdateSourceForm.patchValue(this.sourceService.GetxById);
    this.dialog.open(this.Update);
  }


  async UpdateSources() {
    await this.sourceService.Update(this.UpdateSourceForm.value);


  }






  selectedItem = 0;
  OpenDeleteDialog(id: number) {
    this.selectedItem = id;
    this.dialog.open(this.DeletEpisode);
  }

  async DeleteEpisod() {
    await this.episodeService.Delete(this.selectedItem);
    await this.episodeService.GetAllEpisode();
    this.dataSource.data = this.episodeService.GetAllx.filter((value:any) => value.seriesid == this.seriesService.GetxById.id)
  }
}
