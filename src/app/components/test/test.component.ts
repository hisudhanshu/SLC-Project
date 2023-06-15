import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  rawElements: any[] = [];
  selectedItemId: number | undefined;
  materialData: string[] = [];
  selectedMaterialName: string | undefined;
  columnData: string[] = [];

  constructor(private authService: AuthServicesService) {}

  ngOnInit() {
    this.authService.getRawElements().subscribe(
      (data: any) => {
        this.rawElements = data.matdata.filter((item: any) => item.name !== "");
        if (this.rawElements.length > 0) {
          this.columnData = Object.keys(this.rawElements[0]).filter((key) => key !== 'id' && key !== 'name') as string[];
        }
      },
      (error: any) => {
        console.error('Failed to fetch raw elements:', error);
      }
    );
  }

  onMaterialChange() {
    const selectedItem = this.rawElements.find((item: any) => item.id === this.selectedItemId);
    if (selectedItem) {
      this.materialData = Object.values(selectedItem).slice(2).filter((value: any) => typeof value === 'string' && value !== '') as string[];
      this.selectedMaterialName = selectedItem.name;
    } else {
      this.materialData = [];
      this.selectedMaterialName = undefined;
    }
  }
}