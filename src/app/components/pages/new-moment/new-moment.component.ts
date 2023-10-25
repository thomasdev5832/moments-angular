import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = 'Share';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  async createHandler(moment: Moment) {
    
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image) {
      formData.append('image', moment.image);
    }

    // send to service
    await this.momentService.createMoment(formData).subscribe();

    // show message
    this.messagesService.add('Moment added successfully!');

    // redirect
    this.momentService.createMoment(formData).subscribe({
      next: () =>{
        this.messagesService.add("Momento adicionado com sucesso!");
        this.router.navigate(['/']);
      }
    });

  }

}
