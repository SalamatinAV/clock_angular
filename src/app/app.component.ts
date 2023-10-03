import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'clock_angular';
  audioControlBtn: boolean = false;

  hourHand: number = 0;
  minuteHand: number = 0;
  secondHand: number = 0;

  alarm: number = 0;
  savingAlarmValue!: number;
  alarmActivation: boolean = false;

  audioAlarm: HTMLAudioElement = new Audio();
  audioHours: HTMLAudioElement = new Audio();
  audioSeconds: HTMLAudioElement = new Audio();

  data!: Date;
  ngOnInit(): void {
    this.audioAlarm.src = '../assets/audio/bud.mp3';
    this.audioHours.src = '../assets/audio/probil-chas-v-nastennyih-chasah.mp3';
    this.audioSeconds.src =
      '../assets/audio/podnimayuschiysya-naverh-schelchok.mp3';
    this.audioSeconds.volume = 0.5;
    this.clockStart();
  }

  clockStart() {
    setInterval(() => {
      this.data = new Date();

      this.hourHand =
        (this.data.getHours() % 12) * 30 + this.data.getMinutes() * 0.5;

      this.minuteHand =
        this.data.getMinutes() * 6 + this.data.getSeconds() * 0.1;

      this.secondHand = this.data.getSeconds() * 6; // + this.data.getMilliseconds() * 0.006;

      if (this.audioControlBtn) {
        if (this.data.getSeconds() === 0 && this.data.getMinutes() === 0) {
          let hour = this.data.getHours() % 12;
          if (hour === 0) {
            hour = 12;
          }
          for (let i = 0; i < hour; i++) {
            setTimeout(() => {
              this.audioHours.play();
            }, i * 2500);
          }
        }
        this.audioSeconds.play();
      }

      if (this.alarmActivation) {
        if (this.hourHand === this.alarm) {
          this.savingAlarmValue = this.hourHand;
          this.audioAlarm.loop = true;
          this.audioAlarm.play();
        }
      } else {
        this.audioAlarm.pause();
        this.audioAlarm.currentTime = 0;
      }
      if (this.hourHand - this.savingAlarmValue === 1) {
        this.audioAlarm.pause();
        this.audioAlarm.currentTime = 0;
      }
    }, 1000);
  }

  alarmClockArrow(e: any) {
    this.alarmActivation = false;
    this.alarm = e.deltaY <= 0 ? (this.alarm += 0.5) : (this.alarm -= 0.5);
    if (this.alarm > 359.5) {
      this.alarm = 0;
    }
    if (this.alarm < 0) {
      this.alarm = 359.5;
    }
  }
}
