import { Component, OnInit } from '@angular/core';
import '../../../vendor/jitsi/external_api.js';
import { ActivatedRoute } from '@angular/router';

declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit {

  private conferenceId;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    const jwtData = localStorage.getItem('auth_token');
    console.log(user);
    console.log(jwtData);

    this.route.paramMap.subscribe( paramMap => {
      this.conferenceId = paramMap.get('id');
      const domain = 'meet.jit.si';
      const options = {
          roomName: this.conferenceId,
          parentNode: document.querySelector('#jitsi-container'),
          width: 600,
          height: 400,
          // jwt: jwtData,
          userInfo: {
            email: user.email,
            displayName: `${user.firstName} ${user.lastName}`
        }
      };
      console.log(options);
      const api = new JitsiMeetExternalAPI(domain, options);
    });

  }
}
