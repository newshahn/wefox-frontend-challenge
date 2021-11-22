import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Place } from 'src/app/core/models/wefox-place.model';
import { WefoxRESTService } from 'src/app/core/services/REST/wefox-rest.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
})
export class PlaceDetailComponent implements OnInit {
  place: Place | undefined;

  constructor(
    private route: ActivatedRoute,
    private restService: WefoxRESTService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPlace();
  }

  get Place(): Place {
    return this.place;
  }

  getPlace(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    console.log(id);
    this.restService.getPlace(id).subscribe((place) => (this.place = place));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.place) {
      this.restService.updatePlace(this.place).subscribe(() => this.goBack());
    }
  }
}
