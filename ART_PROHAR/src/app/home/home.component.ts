import { Component, AfterViewInit, ElementRef,ViewChild,  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  gifts = [
    'Gift Category 1',
    'Gift Category 2',
    'Gift Category 3',
    'Gift Category 4',
    'Gift Category 5',
    'Gift Category 6',
    'Gift Category 7',
    'Gift Category 8',
    'Gift Category 9',
    'Gift Category 10'
  ];

    @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

ngAfterViewInit() {
    let startX = 0;
    const carouselEl = this.carousel.nativeElement;

    carouselEl.addEventListener('touchstart', (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    });

    carouselEl.addEventListener('touchend', (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50) {
        this.scrollGifts('right');
      } else if (diff < -50) {
        this.scrollGifts('left');
      }
    });
  }

  scrollGifts(direction: 'left' | 'right') {
    console.log(direction);
  }
}
