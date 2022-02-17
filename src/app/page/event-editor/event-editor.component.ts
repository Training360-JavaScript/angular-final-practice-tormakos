import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  editedEvent?: Event

// event$: Observable<Event> = this.activatedRoute.params.pipe(
//     switchMap(params => this.eventService.get(params['id']))
//   )

  constructor(
    private eventService: EventService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => this.eventService.get(params['id'])
      .subscribe(event => this.editedEvent = event))
  }

  onUpdate(form: NgForm): void {
    console.log(form.value);

    if (this.editedEvent) {
      this.eventService.update(this.editedEvent).subscribe(
      () => this.router.navigate(['/']));
    }
  }
}
