import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl } from '@angular/forms';

// import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

interface ISearchPlayerResponse {
  metadata: any;
  data: IPlayerSearchResult[];
}

interface IBirthplace {
  id: number;
  localityType: string;
  name: string;
}

interface IProfileDescription {
  id: number;
  info: string;
  updated: Date;
}

interface ILastPlayerStats {
  A: number;
  G: number;
  GP: number;
  PIM: number;
  PM: number;
  PPG: number;
  TP: number;
  contractType: string;
  gameType: string;
  id: number;
  jerseyNumber: number;
  league: ILeague | any;
  season: ISeason | any;
  sort: number;
  team: ITeam | any;
}

interface ILeague {

}

interface ISeason {
  active: boolean | string;
  endYear: number;
  id: number;
  name: string;
  startYear: number;
  updated: Date;
}

interface ITeam {
  name: string;
  // There's more

}

interface IPlayerSearchResult {
  _relevance: number;
  _score: number;
  bioHistory: string;
  birthPlace: IBirthplace;
  caphit: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  id: number;
  playerGameStatus: string;
  playerPosition: string;
  playerStatus: string;
  profileDescription?: IProfileDescription;
  shoots: string;
  updated: Date;
  yearOfBirth: number;
  lastPlayerStats: ILastPlayerStats;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchControl = new FormControl();
  searchResults: any[] = [];

  constructor(
    private http: Http
  ) {
  }

  ngOnInit() {
    // this.searchControl.setValue("Sidney Crosby");
  }


  getPlayers(name: string): Observable<ISearchPlayerResponse> {
    return this.http.get(`http://api.eliteprospects.com/beta/search?type=player&q=${name}&filter=(latestPlayerStats.league.id=7)`)
      .map(data => {
        return data.json();
      })
      .map(data => { return data.players || [] })
      .catch(this.handleError);
  }

  getPlayerStats(id: number): Observable<any> {
    return this.http.get(`http://api.eliteprospects.com:80/beta/players/${id}`)
      .map(data => {
        return data.json();
      })
      // .map(data => { return data.players || [] })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  onSearch() {
    this.getPlayers(this.searchControl.value)
      .subscribe(result => {
        console.log('result', result);
        // console.log(JSON.stringify(result.data[0]));
        this.searchResults = result.data;
      })
  }

}
