import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit {

  public claseFav = "fa fa-heart fa_custom";
  
  favorito() {

    if (this.claseFav === "fa fa-heart fa_custom"){
        this.claseFav = "fa fa-heart-o fa_custom";
    } else {
      this.claseFav = "fa fa-heart fa_custom";
    }
 
  }


  constructor() { }

  ngOnInit(): void {
  }

}
