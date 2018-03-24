import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  // public brandPrimary = '#20a8d8';
  // public brandSuccess = '#4dbd74';
  // public brandInfo = '#63c2de';
  // public brandWarning = '#f8cb00';
  // public brandDanger = '#f86c6b';

 // lineChart4
 public lineChart4Data: Array<any> = [
  {
    data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
    label: 'Series A'
  }
];
public lineChart4Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
public lineChart4Options: any = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      points: false,
    }],
    yAxes: [{
      display: false,
    }]
  },
  elements: { point: { radius: 0 } },
  legend: {
    display: false
  }
};
public lineChart4Colours: Array<any> = [
  {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,.55)',
    borderWidth: 2
  }
];
public lineChart4Legend = false;
public lineChart4Type = 'line';


    // barChart2
    public barChart2Data: Array<any> = [
      {
        data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
        label: 'Series A'
      }
    ];
    public barChart2Labels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public barChart2Options: any = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          display: false,
          barPercentage: 0.6,
        }],
        yAxes: [{
          display: false,
          ticks: {
            beginAtZero: true,
          }
        }]
      },
      legend: {
        display: false
      }
    };
    public barChart2Colours: Array<any> = [
      {
        backgroundColor: 'rgba(0,0,0,.2)',
        borderWidth: 0
      }
    ];
    public barChart2Legend = false;
    public barChart2Type = 'bar';

    constructor( ) { }

    // events
    public chartClicked(e: any): void {
      console.log(e);
    }

    public chartHovered(e: any): void {
      console.log(e);
    }

}
