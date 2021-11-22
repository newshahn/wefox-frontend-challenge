import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Place } from 'src/app/core/models/wefox-place.model';
import { WefoxRESTService } from 'src/app/core/services/REST/wefox-rest.service';

@Component({
  selector: 'places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  private newPlaceForm: FormGroup;

  constructor(
    private restService: WefoxRESTService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPlaces();

    this.newPlaceForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      content: ['', [Validators.required, Validators.maxLength(50)]],
      lat: [''],
      long: [''],
      image_url: [''],
    });
  }

  get newPlaceFormGroup(): FormGroup {
    return this.newPlaceForm;
  }

  getPlaces(): void {
    this.restService.getPlaces().subscribe((places) => (this.places = places));
  }

  add(): void {
    let { title, content, ...dataToSend } = this.newPlaceForm.value;

    if (!title?.trim() || !content?.trim()) {
      return;
    }
    this.restService
      .addPlace(this.newPlaceForm.value as Place)
      .subscribe((place) => {
        console.log(`{place.title} was added to places`);
      });
  }

  delete(place: Place): void {
    this.places = this.places.filter((p) => p !== place);
    this.restService.deletePlace(place.id).subscribe();
  }
}
