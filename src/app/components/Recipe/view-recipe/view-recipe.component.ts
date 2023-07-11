import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  recipes: any[] = []; // Array to store all recipes data
  filteredRecipes: any[] = []; // Array to store filtered recipes data
  searchKeyword: string = ''; // Variable to store the search keyword
  selectedRecipe: any;

  constructor(private authService: AuthServicesService) { }

  ngOnInit(): void {
    this.authService.getRecipes().subscribe(
      (response: any) => {
        if (response.isSuccess && response.jsonData !== null) {
          this.recipes = JSON.parse(response.jsonData);
          this.filteredRecipes = this.recipes; // Initialize filteredRecipes with all recipes
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );
  }

  searchRecipes(): void {
    if (this.searchKeyword.trim() === '') {
      this.filteredRecipes = this.recipes; // If search keyword is empty, show all recipes
    } else {
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }

  editRecipe(recipe: any): void {
    // Set 'isEditing' property to true for the selected recipe
    recipe.isEditing = true;
  
    // Clone the recipe object to create a backup
    recipe.backup = { ...recipe };
  }
  
  cancelEdit(recipe: any): void {
    // Restore the original values from the backup
    Object.assign(recipe, recipe.backup);
  
    // Set 'isEditing' property back to false
    recipe.isEditing = false;
  }
  updateRecipe(recipe: any): void {
    // Implement your logic for updating a recipe
    console.log('Update recipe:', recipe);
  
    // Set 'isEditing' property back to false after updating
    recipe.isEditing = false;
    delete recipe.backup; // Remove the backup property
  }

  // Component logic
  deleteRecipe(material: any) {
    // Find the index of the material in the selectedMaterial array
    const index = this.selectedRecipe.indexOf(material);

    if (index !== -1) {
      // Remove the material from the selectedMaterial array
      this.selectedRecipe.splice(index, 1);

      // Optionally, you can perform additional logic such as sending an HTTP request to delete the material from the server

      console.log('Deleted material:', material);
    }
  }

  saveRecipe(recipe: any): void {
    // Implement your logic for saving the edited recipe
    console.log('Save recipe:', recipe);
  }
  // Inside your component class
  openModal(recipe: any) {
    this.selectedRecipe = recipe;
  }
  showDetails(recipe: any) {
    this.selectedRecipe = recipe; // Set the selected recipe details
  }
  hasDuplicateId(id: any): boolean {
    return this.filteredRecipes.findIndex((recipe: any) => recipe.Id === id) !== this.filteredRecipes.findIndex((recipe: any) => recipe.Id === id);
  }
}
