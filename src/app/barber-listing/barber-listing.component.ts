import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';
import { Component,AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barber-listing',  
  templateUrl: './barber-listing.component.html',
  styleUrls: ['./barber-listing.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NgClass, FormsModule] 
})

export class BarberListingComponent {

  constructor(private router: Router) { }

  barbers = [
    { id: 1, name: "João Silva", rating: 4.8, distance: "1.2 km", cuts: 1423, imageUrl: "https://placehold.co/600x400/png" },
    { id: 2, name: "Maria Santos", rating: 4.9, distance: "1.8 km", cuts: 1892, imageUrl: "https://placehold.co/600x400/png" },
    { id: 3, name: "Pedro Oliveira", rating: 4.7, distance: "2.3 km", cuts: 1156, imageUrl: "https://placehold.co/600x400/png" },
    { id: 4, name: "Ana Costa", rating: 4.9, distance: "2.5 km", cuts: 1345, imageUrl: "https://placehold.co/600x400/png" },
    { id: 5, name: "Carlos Souza", rating: 4.8, distance: "2.7 km", cuts: 1678, imageUrl: "https://placehold.co/600x400/png" },
    { id: 6, name: "Pedro Oliveira", rating: 4.7, distance: "2.3 km", cuts: 1156, imageUrl: "https://via.placeholder.com/300" },
    { id: 7, name: "aaaaaaaaaa", rating: 4.9, distance: "2.5 km", cuts: 1345, imageUrl: "https://via.placeholder.com/300" },
    { id: 8, name: "cccccccccc", rating: 4.8, distance: "2.7 km", cuts: 1678, imageUrl: "https://via.placeholder.com/300" },
    { id: 9, name: "ggggggggggg", rating: 4.7, distance: "2.3 km", cuts: 1156, imageUrl: "https://via.placeholder.com/300" },
    { id: 10, name: "yyyyyyyyyya", rating: 4.9, distance: "2.5 km", cuts: 1345, imageUrl: "https://via.placeholder.com/300" },
    { id: 11, name: "tttttttttt", rating: 4.8, distance: "2.7 km", cuts: 1678, imageUrl: "https://via.placeholder.com/300" },
    { id: 12, name: "eeeeeeeeee", rating: 4.7, distance: "2.3 km", cuts: 1156, imageUrl: "https://via.placeholder.com/300" },
    { id: 13, name: "wwwwwwwww", rating: 4.9, distance: "2.5 km", cuts: 1345, imageUrl: "https://via.placeholder.com/300" },
    { id: 14, name: "6666666666", rating: 4.8, distance: "2.7 km", cuts: 1678, imageUrl: "https://via.placeholder.com/300" },
  ];

  showFilters = false;
  filteredBarbers = this.barbers;
  itemsPerPage = 1; // Número de itens por página
  currentPage = 0;
  nomeFiltro = '';
  distanciaFiltro = '';
  avaliacaoFiltro = '';

  totalPages: number = Math.ceil(this.barbers.length / this.itemsPerPage);

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  goToPriceTable() {
    this.router.navigate(['/prices']);
  }

  applyFilters() {
    this.filteredBarbers = this.barbers.filter(barber => {
      const nomeMatch = !this.nomeFiltro || barber.name.toLowerCase().includes(this.nomeFiltro.toLowerCase());
      const distanciaMatch = !this.distanciaFiltro || parseFloat(barber.distance) <= parseFloat(this.distanciaFiltro);
      const avaliacaoMatch = !this.avaliacaoFiltro || barber.rating >= parseFloat(this.avaliacaoFiltro);
      return nomeMatch && distanciaMatch && avaliacaoMatch;
    });

    this.currentPage = 0;

    this.totalPages = Math.ceil(this.filteredBarbers.length / this.itemsPerPage);
  }

  goToPage(page: number) {
        if (page >= 0 && page < this.totalPages) {
            this.currentPage = page;
            console.log(this.currentPage)
        }
  }

  get paginatedBarbers() {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.filteredBarbers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationRange(): number[] {
    const visiblePages = 3; // Número máximo de páginas visíveis
    let startPage = this.currentPage - 1;
    let endPage = this.currentPage + 1;

    if (startPage < 0) {
      startPage = 0;
      endPage = Math.min(visiblePages-1, this.totalPages - 1);
    } else if (endPage >= this.totalPages) {
      endPage = this.totalPages - 1;
      startPage = Math.max(0, endPage - (visiblePages -1 ));
    }
     return Array.from({ length: Math.min(endPage - startPage +1,this.totalPages)}, (_, i) => startPage + i);

  }

  goToBarberProfile(barberId: number) {
    console.log("Navegando para o perfil do barbeiro:", barberId);
    this.router.navigate([`/barber/${barberId}`]);
  }

}
