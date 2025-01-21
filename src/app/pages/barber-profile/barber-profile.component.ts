import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barber-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barber-profile.component.html',
  styleUrl: './barber-profile.component.css'
})
export class BarberProfileComponent implements OnInit, OnDestroy{
  barberId!: number;
  barber: any;
  currentReelIndex = 0;
  reelInterval: any;

  constructor(private route: ActivatedRoute) { 
    console.log("BarberProfileComponent carregado");
  }

  ngAfterViewInit() { // Inicia o carrossel depois que a view é inicializada
    
  }

  ngOnDestroy() {
    clearInterval(this.reelInterval);
}

  ngOnInit() {
    this.route.params.subscribe(params => {
    console.log("Parâmetros da rota:", params);
    this.barberId = +params['id'];
    this.barber = this.findBarberById(this.barberId);

    if (this.barber) {
      this.barber.numRatings = 256; // Número de avaliações
      this.barber.reels = [
        { width: 300, height: 400, likes: 245, imageUrl: "https://placehold.co/600x400/png"},
        { width: 300, height: 400, likes: 189, imageUrl: "https://placehold.co/600x400/png" },
        { width: 300, height: 400, likes: 312, imageUrl: "https://placehold.co/600x400/png"}
      ]; // Dados dos reels
      this.barber.confirmedAppointments = [
        { id: 1, clientName: 'Ricardo Oliveira', address: 'Rua Augusta, 1500, Jardins, São Paulo - SP', date: '2025-01-12', time: '10:00' },
        { id: 2, clientName: 'Marcos Pereira', address: 'Avenida Paulista, 1000, Bela Vista, São Paulo - SP', date: '2025-01-13', time: '16:30' }
      ];
      this.barber.pendingRequests = [
        { id: 3, clientName: 'Carlos Santos', date: '2025-01-10', time: '14:00' },
        { id: 4, clientName: 'Andre Lima', date: '2025-01-10', time: '15:30' } 
      ]

      this.startReelInterval();
    }
    });
  }

  startReelInterval() {
    if (this.barber && this.barber.reels && this.barber.reels.length > 0) {
        this.reelInterval = setInterval(() => {
            this.nextReel();
        }, 3000); // Intervalo de 3 segundos
    }
  }

  nextReel() {
    if (this.barber && this.barber.reels && this.barber.reels.length > 0) {
        this.currentReelIndex = (this.currentReelIndex + 1) % this.barber.reels.length;
    }
  }

  prevReel() {
      if (this.barber && this.barber.reels && this.barber.reels.length > 0) {
          this.currentReelIndex = (this.currentReelIndex - 1 + this.barber.reels.length) % this.barber.reels.length;
      }
  }

  resetReelProgress() {
    clearInterval(this.reelInterval); // Limpa o intervalo anterior
    this.startReelInterval(); // Reinicia o intervalo
  }

  findBarberById(id: number) {  
    const barbers = [ 
      { id: 1, name: "João Silva", rating: 4.8, distance: "1.2 km", cuts: 1423, imageUrl:"https://placehold.co/600x400/png"  },
      { id: 2, name: "Maria Santos", rating: 4.9, distance: "1.8 km", cuts: 1892, imageUrl: "https://placehold.co/600x400/png" },
    ];
    return barbers.find(barber => barber.id === id);
  }

  cancelAppointment(appointmentId: number) {
    console.log('Cancelando agendamento:', appointmentId);
  }

  acceptRequest(requestId: number) {
    console.log('aceitar agendamento:', requestId);
  }

  rejectRequest(requestId: number) {
    console.log('recusar agendamento:', requestId);
  }
}
