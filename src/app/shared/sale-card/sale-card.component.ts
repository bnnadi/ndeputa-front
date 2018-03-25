import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sale-card',
  templateUrl: './sale-card.component.html'
})

export class SaleCardComponent implements OnChanges {
  @Input() item: any;

// public brandPrimary = '#20a8d8';
// public brandSuccess = '#4dbd74';
// public brandInfo = '#63c2de';
// public brandWarning = '#f8cb00';
// public brandDanger = '#f86c6b';

 // lineChart
 public lineChartData: Array<any> = [
    {
      data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
      label: 'Series A'
    }
  ];
  public lineChartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public lineChartOptions: any = {
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
  public lineChartColours: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      borderWidth: 2
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  // barChart
  public barChartData: Array<any> = [
        {
          data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
          label: 'Series A'
        }
  ];
  public barChartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartOptions: any = {
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
  public barChartColours: Array<any> = [
        {
          backgroundColor: 'rgba(0,0,0,.2)',
          borderWidth: 0
        }
  ];
  public barChartLegend = false;
  public barChartType = 'bar';

  constructor() {}

     // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

  ngOnChanges() {}


 }
