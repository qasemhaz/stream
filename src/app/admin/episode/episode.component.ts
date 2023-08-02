import { Component, PipeTransform } from '@angular/core';
import { MovieService } from 'src/app/movie.service';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

interface Country {
	name: string;
	flag: string;
	area: number;
	population: number;
}

const COUNTRIES: Country[] = [
	{
		name: 'Russia',
		flag: 'f/f3/Flag_of_Russia.svg',
		area: 17075200,
		population: 146989754,
	},
	{
		name: 'Canada',
		flag: 'c/cf/Flag_of_Canada.svg',
		area: 9976140,
		population: 36624199,
	},
	{
		name: 'United States',
		flag: 'a/a4/Flag_of_the_United_States.svg',
		area: 9629091,
		population: 324459463,
	},
	{
		name: 'China',
		flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
		area: 9596960,
		population: 1409517397,
	},
];
function search(text: string, pipe: PipeTransform): Country[] {
	return COUNTRIES.filter((country) => {
		const term = text.toLowerCase();
		return (
			country.name.toLowerCase().includes(term) ||
			pipe.transform(country.area).includes(term) ||
			pipe.transform(country.population).includes(term)
		);
	});
}
@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent {
 // products:any;
 countries$: any;
 filter = new FormControl('', { nonNullable: true });

 constructor(pipe: DecimalPipe,private movieService: MovieService) {
  //  this.countries$ = this.filter.valueChanges.pipe(
  //    startWith(''),
  //    map((text) => search(text, pipe)),
  //  );
 }





  // constructor(private movieService: MovieService) {}
mov:any
  cols: any;

  exportColumns: any;

  ngOnInit() {
    
      this.movieService.GetAllMovie().then((data) => {
          this.mov = data;
      });

      this.cols = [
          { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
          { field: 'name', header: 'Name' },
          { field: 'category', header: 'Category' },
          { field: 'quantity', header: 'Quantity' }
      ];

      this.exportColumns = this.cols.map((col:any) => ({ title: col.header, dataKey: col.field }));
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



}
