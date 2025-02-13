import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'terra-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css'],
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() password = '';
  score = 0;
  widthScore = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password'] && !changes['password'].firstChange) {
      this.score = this.evaluarFortalezaContrasena(this.password);
      this.updatePasswordStrength();
    }
  }

  evaluarFortalezaContrasena(contrasena: string): number {
    let puntos = 0;

    const letrasMayusculas = contrasena.replace(/[^A-Z]/g, '').length;
    const letrasMinusculas = contrasena.replace(/[^a-z]/g, '').length;
    const numeros = contrasena.replace(/[^0-9]/g, '').length;
    const simbolosEspeciales = contrasena.replace(/[A-Za-z0-9]/g, '').length;

    if (letrasMayusculas >= 2) puntos += 1;
    if (letrasMinusculas >= 4) puntos += 1;
    if (numeros >= 2) puntos += 1;
    if (simbolosEspeciales >= 1) puntos += 1;
    if (contrasena.length >= 12 && contrasena.length <= 16) puntos += 1;

    return puntos;
  }

  updatePasswordStrength() {
    this.widthScore = this.score * 20;
  }
}
