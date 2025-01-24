import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-price-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-table.component.html',
  styleUrl: './price-table.component.css'
})
export class PriceTableComponent {
  services = [
    { name: 'Corte Tradicional', duration: '45min', price: 70 },
    { name: 'Degradê', duration: '45min', price: 80 },
    { name: 'Acabamento de Barba', duration: '30min', price: 45 },
    { name: 'Barba Completa', duration: '45min', price: 55 },
    { name: 'Coloração', duration: '90min', price: 150 },
    { name: 'Corte Infantil', duration: '30min', price: 45 },
  ];
}
