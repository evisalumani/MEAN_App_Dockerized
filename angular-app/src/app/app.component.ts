import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  // Link to our api, pointing to localhost
  // We are connecting to port 3000 exposed from express service
  API = 'http://localhost:3000';

  /**
   * API = 'express-server-service';
   * API = 'http://express-server-service:3000'; // Doesn't work :(
   * Even though executing it from inside the container works
   * root@dbd5a7987bc7:/usr/src/app# curl http://express-server-service:3000/users
    [{"_id":"5a575c6163073e000f03eeaf","name":"test","age":22,"__v":0}]
   */

  // Declare empty list of people
  people: any[] = [];

  constructor(private http: Http) {}

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllPeople();
  }

  // Add one person to the API
  addPerson(name, age) {
    this.http.post(`${this.API}/users`, {name, age})
      .map(res => res.json())
      .subscribe(() => {
        this.getAllPeople();
      })
  }

  // Get all users from the API
  getAllPeople() {
    this.http.get(`${this.API}/users`)
      .map(res => res.json())
      .subscribe(people => {
        console.log(people)
        this.people = people
      }, error => {
        console.log("Error connecting to Express API");
        console.log(error);
      })
  }
}
