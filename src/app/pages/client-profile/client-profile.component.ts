import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../services/user-profile.service.ts.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit {
  userUuid!: string;
  user: any = null;
  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userUuid = params['id'];
      this.loadUserProfile(this.userUuid);
    });
  }

  loadUserProfile(uuid: string) {
    this.userProfileService.getUserData(uuid).subscribe({
      next: ([userResponse, servicesResponse]) => {
        this.user = userResponse.user;
        this.user.imageUrl = this.user.imageUrl || "https://placehold.co/600x400/png";
        this.user.rating = 4.5;
        this.user.numRatings = 120;

        this.user.favoriteBarbers = userResponse.barbersList.map((barber: any) => ({
          id: barber.user.uuid,
          name: barber.user.name,
          rating: barber.assessment
        }));

        this.user.recentAppointment = servicesResponse.content.map((service: any) => ({
          id: service.services[0].serviceUuid,
          name: service.services.map((s: any) => s.name).join(", "),
          rating: service.rate,
          date: new Date(service.requestDate),
          time: new Date(service.requestDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          totalPrice: service.totalPrice,
          status: service.requestStatus
        }));

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar perfil do usuário:', error);
        this.isLoading = false;
      }
    });
  }

  addFavorite(barberId: string) {
    console.log('Adicionando barbeiro aos favoritos:', barberId);
  }

  removeFavorite(barberId: string) {
    console.log('Removendo barbeiro dos favoritos:', barberId);
  }

  goToBarberProfile(barberId: string) {
    this.router.navigate(['/barber', barberId]);
  }
}
