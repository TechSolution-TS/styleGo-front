import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit {
  userId!: number;
  user: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.userId = +params['id'];
          this.user = this.findUserById(this.userId); // Buscar os dados do usuário

          if (this.user) {
              // Inicializar dados de exemplo (substitua pela sua lógica de API)
              this.user.imageUrl = "https://placehold.co/600x400/png";
              this.user.rating = 4.5;
              this.user.numRatings = 120;
              this.user.recentAppointment = [
                  { id: 3, name: "Outro Barbeiro", rating: 4.2, date: new Date('2024-10-20T10:00:00'), time: '10:00' },
                  { id: 2, name: "Outro Barbeiro", rating: 4.2, date: new Date('2024-12-20T10:00:00'), time: '10:00' },
              ];
              this.user.favoriteBarbers = [
                { id: 1, name: "João Silva", rating: 4.8 },
            ];
          }
      });
  }

  addFavorite(barberId: number) {
    console.log('Adicionando barbeiro aos favoritos:', barberId);
  }

  removeFavorite(barberId: number) {
    console.log('Removendo barbeiro dos favoritos:', barberId);
  }

  findUserById(id: number) {
      // Lógica para buscar os dados do usuário pelo ID (substitua pelo seu serviço)
      const users = [
          { id: 1, name: "Usuário Exemplo", rating: 4.6, numRatings: 85, imageUrl: '...' },
          // ... mais usuários
      ];
      return users.find(user => user.id === id);
  }

  goToBarberProfile(barberId: number) {
      this.router.navigate(['/barber', barberId]);
  }
  // ... outros métodos ...
}
