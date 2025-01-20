import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barber-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barber-profile.component.html',
  styleUrl: './barber-profile.component.css'
})
export class BarberProfileComponent {
  barberId!: number;
  barber: any;

  constructor(private route: ActivatedRoute) { 
    console.log("BarberProfileComponent carregado");
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    console.log("Parâmetros da rota:", params);
    this.barberId = +params['id'];
    this.barber = this.findBarberById(this.barberId);
    });
  }

  findBarberById(id: number) {  
    const barbers = [ 
      { id: 1, name: "João Silva", rating: 4.8, distance: "1.2 km", cuts: 1423 },
      { id: 2, name: "Maria Santos", rating: 4.9, distance: "1.8 km", cuts: 1892 },
    ];
    return barbers.find(barber => barber.id === id);
  }
}
