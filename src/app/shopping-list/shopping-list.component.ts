import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredent.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Ingredient[];
  private subscription :Subscription;

    constructor(private slService: ShoppingListService) {}

    ngOnInit() {
      this.ingrediants = this.slService.getIndgredients();
      this.subscription = this.slService.ingredientsChanged.subscribe(
        (ingrediants:Ingredient[])=>{
        this.ingrediants = ingrediants;
      });
    }

    onEditItem(index: number){
      this.slService.startedEditing.next(index);
    }

    ngOnDestroy(): void {
     this.subscription.unsubscribe(); 
    }


}
