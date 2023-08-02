import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/login.service';
import { RoleService } from 'src/app/role.service';
import { UserService } from 'src/app/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  @ViewChild(MatSort) sort:any= MatSort;
  displayedColumns: string[] = ['id', 'name', 'rate','phone','email', 'fruit'];
  dataSource: any;
  users:any
  cols: any;

  exportColumns: any;


  constructor(
    public userService: UserService,public roleService: RoleService,
    public dialog: MatDialog,public loginService: LoginService
  )
  {
    this.dataSource = new MatTableDataSource();
  }
  async ngOnInit() {
    await this.userService.GetAllUser();
    await this.loginService.GetAllLogin();
    await this.roleService.GetAllRole();




    this.dataSource.data = this.userService.GetAllx
          this.users = this.userService.GetAllx.map((col:any) => ({ name: col.name, email: col.email, phone: col.phone }));
          this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'email', header: 'Email' },
            { field: 'phone', header: 'Phone' },

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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, 'users.xlsx');
  }
  exportPdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4');
            (doc as any).autoTable(this.exportColumns, this.users);
            doc.save('users.pdf');
        });
    });
}
}
