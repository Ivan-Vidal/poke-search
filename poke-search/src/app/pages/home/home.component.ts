import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { SweetAlertService } from 'src/app/core/services/sweetAlert.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
PokesFiltered: any
pokemon: any
pokemonModal: any
loading: boolean = true
isModal: boolean = false
pokeName = new FormControl();
constructor(private api: ApiService, private sweet: SweetAlertService) { }

  ngOnInit(): void {
    
    this.getAllPokesHome()
    this.loadingSpinner()
    
  }

   async getAllPokesHome() {
    try {
      await fetch(`${environment.APIKEY}?limit=10000"`)
      .then(response => response.json())
      .then(allpokemon => {
        this.pokemon = [];
  
        allpokemon.results.map((val: any) => {
         fetch(val.url)
          .then(response => response.json())
          .then(pokemonSingle => {
            this.pokemon.push({
                'nome': val.name,
                'types': pokemonSingle.types,
                'imagem': pokemonSingle.sprites.front_default
            })        
          })
        })
      })
    } catch (error) {
     this.sweet.error(`Ocorreu o erro... ${error}`, 'OPS!')
    }
   
  }

  loadingSpinner() {
         
    setTimeout(() => {
    this.loading = false
    }, 5000);
  
  }

 async showModal(nome: any) {
  this.pokemonModal
    this.isModal = !this.isModal
    await fetch(`${environment.APIKEY}/${nome}`)
    .then(response => response.json())
    .then(pokemonSingle => {
      this.pokemonModal = {
          'nome': pokemonSingle.name,
          'imagem': pokemonSingle.sprites.front_default
    }
  }
    )

    console.log(this.pokemonModal)
      Swal.fire({
        title: this.pokemonModal.nome,
        text: 'é um pokemon',
        imageUrl: this.pokemonModal.imagem,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: this.pokemonModal.nome,
        confirmButtonText: 'Voltar',
      }).then(() => {
        this.isModal = !this.isModal
      })
  }

  onSearch() {

    if (this.pokeName.value < 3 ) {
      return;
    } else {

      this.sweet.info('Ainda está em manutenção','OPS!')
      
    }


// const keywords = [...new Set(this.pokeName.value.split(' ').filter((e: any) => e.length > 3))];

// this.PokesFiltered = this.pokemon.filter((e: any) => {
//   keywords.map((keyword: any) => e.nome.toLowerCase().includes(keyword.toLowerCase()))
//   return keywords
// }
// )

// console.log(this.PokesFiltered)

  //   const keywords = [...new Set(this.pokeName.value.split(' ').filter((e: any) => e.length > 2))];

  //   this.pokemon = this.allPokes.filter((e: any) => {
  //     let matchAll = true;
  //     // faz a pesquisa de cada termo. caso algum termo não esteja presente, a pergunta toda é descartada do filtro
  //     keywords.map((keyword: any) => !e.pergunta.toLowerCase().includes(keyword.toLowerCase()) && (matchAll = false));
  //     fetch(`${environment.APIKEY}/${keywords}`)
  //  .then(response => response.json())
  //  .then(allpokemon => {
  //    this.pokemon = allpokemon;
  //    console.log(this.pokemon)
  //  })
  //     // só irá filtrar caso todos os termos pesquisados estejam presentes na pergunta
  //     return matchAll;

  //  console.log(this.pokeName.value) 

   
   
  // }
  //   )

 
  }
}