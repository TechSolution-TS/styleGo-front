import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';
import { Component,AfterViewInit, ElementRef, ViewChild, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BarberService } from '../services/barber.service';


@Component({
  selector: 'app-barber-listing',  
  templateUrl: './barber-listing.component.html',
  styleUrls: ['./barber-listing.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, NgClass, FormsModule] 
})

export class BarberListingComponent  implements OnInit{

  constructor(private router: Router, private barberService: BarberService) { }

  ngOnInit(): void {
    this.loadBarbers();
  }

  barbers: any[] = [];

  showFilters = false;
  filteredBarbers = this.barbers;
  itemsPerPage = 1;
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
      const avaliacaoMatch = !this.avaliacaoFiltro || barber.assessment >= parseFloat(this.avaliacaoFiltro);
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

  loadBarbers(): void {
    this.barberService.getBarbers().subscribe(response => {
      this.barbers = response.content.map((barber: any) => ({
        id: barber.user.uuid,
        name: barber.user.name,
        assessment: barber.assessment,
        numberCuts: barber.numberCuts,
        imageUrl: barber.user.imageUrl || 'https://via.placeholder.com/300',
        distance: "1.2 km"
      }));
      this.filteredBarbers = this.barbers;
      this.totalPages = Math.ceil(this.filteredBarbers.length / this.itemsPerPage);
    }, error => {
      console.error('Erro ao buscar barbeiros:', error);
    });
  }

}
