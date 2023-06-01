import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input() name!: string
@Input() img!: string
@Input() types!: any
@Input() function!: Event
element: any
  isModal: any;
  pokemon: any
  constructor() { }

  ngOnInit(): void {
  }

  
}
