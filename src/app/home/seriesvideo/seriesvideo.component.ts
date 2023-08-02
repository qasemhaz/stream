import { Component } from '@angular/core';
import { EpisodeService } from 'src/app/episode.service';
import { SeriesService } from 'src/app/series.service';
import { SourceService } from 'src/app/source.service';

@Component({
  selector: 'app-seriesvideo',
  templateUrl: './seriesvideo.component.html',
  styleUrls: ['./seriesvideo.component.css']
})
export class SeriesvideoComponent {
  constructor(public sourceService:SourceService
    )
    {}
    async ngOnInit(){
     
     await this.sourceService.GetAllSource();
    }
}
