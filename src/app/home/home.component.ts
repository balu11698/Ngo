
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { totalData } from '../service/interface';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalCases: number = 0;
  resolvedCases: number = 0;
  totalChartDataLoading: boolean = false;
  periodChartDataLoading: boolean = false;
  totalData: any[] = []
  totalRegisteredData: any[] = []
  timePeriodRegisteredData: any[] = []
  timePeriod: string = "Today"
  timePeriodArray = ["Today", "Past 1 Week", "Past 1 Month"]
  colorScheme = {
    domain: ['#A10A28', '#5AA454', '#C7B42C', '#AAAAAA']
  };
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.totalChartDataLoading = true;
    this.periodChartDataLoading = true;
    this.api.getStats().subscribe((data: any) => {
      this.totalData = data;
      this.totalRegistered();
    })
  }
  totalRegistered() {
    for (let i in this.totalData) {
      this.totalCases += (this.totalData[i]['incomingCases']);
      this.resolvedCases += (this.totalData[i]['resolvedCases']);
    }
    this.totalRegisteredData.push({ 'name': "Total", 'value': this.totalCases });
    this.totalRegisteredData.push({ 'name': "Resolved", 'value': this.resolvedCases });
    if (this.timePeriod == "Today") {
      this.selectedTimePeriodRegisteredData("Today");
    }
    this.totalChartDataLoading = false;
    this.periodChartDataLoading = false;
  }
  selectedTimePeriodRegisteredData(timePeriodSelected: any) {
    this.timePeriodRegisteredData = [];
    const todaysDate = new Date();
    const formattedTodaysDate = todaysDate.getFullYear() + '-' + (todaysDate.getMonth() + 1 < 10 ? 0 : '') + (todaysDate.getMonth() + 1) + '-' + (todaysDate.getDate() < 10 ? '0' : '') + todaysDate.getDate();
    const pastOneWeekDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() - 7);
    const formattedPastOneWeekDate = pastOneWeekDate.getFullYear() + '-' + (pastOneWeekDate.getMonth() + 1 < 10 ? 0 : '') + (pastOneWeekDate.getMonth() + 1) + '-' + (pastOneWeekDate.getDate() < 10 ? '0' : '') + (pastOneWeekDate.getDate());
    const pastOneMonthDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth() - 1, todaysDate.getDate());
    const formattedPastOneMonthDate = pastOneMonthDate.getFullYear() + '-' + (pastOneMonthDate.getMonth() + 1 < 10 ? 0 : '') + (pastOneMonthDate.getMonth() + 1) + '-' + (pastOneMonthDate.getDate() < 10 ? '0' : '') + (pastOneMonthDate.getDate());
    let periodData = []
    let totalCases = 0;
    let resolvedCases = 0;
    if (timePeriodSelected == "Today") {
      periodData = this.totalData.filter((data) => {
        return data.date == formattedTodaysDate
      })
    }
    else if (timePeriodSelected == "Past 1 Week") {
      periodData = this.totalData.filter((data) => {
        return data.date >= formattedPastOneWeekDate
      })
    }
    else if (timePeriodSelected == "Past 1 Month") {
      periodData = this.totalData.filter((data) => {
        return data.date >= formattedPastOneMonthDate
      })
    }
    for (let i in periodData) {
      totalCases += periodData[i].incomingCases;
      resolvedCases += periodData[i].resolvedCases;
    }
    this.timePeriodRegisteredData.push({ 'name': "Total", 'value': totalCases })
    this.timePeriodRegisteredData.push({ 'name': "Resolved", 'value': resolvedCases })
  }
  radioChange($event: MatRadioChange) {
    let timePeriodSelected = $event.value;
    this.selectedTimePeriodRegisteredData(timePeriodSelected)
  }
}
