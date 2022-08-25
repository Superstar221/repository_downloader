import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnChanges {

  repos : string[] = [];
  constructor(private heroService: HeroService) {}
  
  ngOnInit(): void {
  }
    ngOnChanges(changes: SimpleChanges): void {
      console.log(this.heroService.repos.length);
    }
   download(name: string): void {
      this.heroService.download(name);
      this.repos = this.heroService.repos;
   }
//   add(name: string): void {
//     name = name.trim();
//     if (!name) { return; }
//     this.heroService.addHero({ name } as Hero)
//       .subscribe(hero => {
//         this.heroes.push(hero);
//       });
//   }

//   delete(hero: Hero): void {
//     this.heroes = this.heroes.filter(h => h !== hero);
//     this.heroService.deleteHero(hero.id).subscribe();
//   }
 
}
