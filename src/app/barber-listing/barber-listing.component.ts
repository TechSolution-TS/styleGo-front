import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe CommonModule
import { NgIf, NgFor, NgClass } from '@angular/common'; // Importe as diretivas

@Component({
  selector: 'app-barber-listing',  // Certifique-se de que este nome é 'app-barber-listing'
  templateUrl: './barber-listing.component.html',
  styleUrls: ['./barber-listing.component.css'],
  standalone: true,  // Adicione esta linha
  imports: [CommonModule, NgIf, NgFor, NgClass] // Adicione as importações aqui
})

export class BarberListingComponent {
  showFilters = false;

  @ViewChild('carousel') carousel!: ElementRef;
    currentSlide = 0;

  barbers = [
    { id: 1, name: "João Silva", rating: 4.8, distance: "1.2 km", cuts: 1423 },
    { id: 2, name: "Maria Santos", rating: 4.9, distance: "1.8 km", cuts: 1892 },
    { id: 3, name: "Pedro Oliveira", rating: 4.7, distance: "2.3 km", cuts: 1156 },
    { id: 4, name: "Ana Costa", rating: 4.9, distance: "2.5 km", cuts: 1345 },
    { id: 5, name: "Carlos Souza", rating: 4.8, distance: "2.7 km", cuts: 1678 },
  ];

  itemsPerPage = 3;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  get totalPages() {
    return Math.ceil(this.barbers.length / this.itemsPerPage);
  }

  ngAfterViewInit() {
    this.initCarousel();
  }

    initCarousel() {
        const slides = this.carousel.nativeElement.querySelectorAll('.carousel-slide');
        if (slides.length > 0) {
            slides[this.currentSlide].classList.add('active');
        }
    }

    prevSlide() {
        this.moveSlide(-1);
    }

    nextSlide() {
        this.moveSlide(1);
    }

    moveSlide(direction: number) {
        const slides = this.carousel.nativeElement.querySelectorAll('.carousel-slide');
        const slideWidth = slides[0].offsetWidth;  // Largura de um slide
        const carouselWidth = this.carousel.nativeElement.offsetWidth; // Largura visível do carrossel
        const maxOffset = (slides.length * slideWidth) - carouselWidth;


        this.currentSlide = (this.currentSlide + direction + slides.length) % slides.length;


        // Ajuste para não ultrapassar os limites
        let translateX = -this.currentSlide * slideWidth;
        if(translateX < -maxOffset)
            translateX = -maxOffset;

        this.carousel.nativeElement.style.transform = `translateX(${translateX}px)`;
        }
}
