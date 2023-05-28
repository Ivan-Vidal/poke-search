import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
allPokes: any
pokemon!: []

constructor(private api: ApiService) { }

  ngOnInit(): void {
    
    this.getAllPokesHome()
    console.log(this.allPokes)
    
  }

  async getAllPokesHome() {
     await this.api.getAllPoke().subscribe((res: any)=> {
      console.log(res.results)
       this.allPokes = res.results

       this.allPokes.map((val: any) => {
        fetch(val.url)
        .then(response => response.json())
        .then(pokeSingle => {
          this.pokemon.push()
        })
      })

      
    })
  }

}
