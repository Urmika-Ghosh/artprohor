import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
    'Gift Category 10',
  ];

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  
  autoScrollDirection: 'right' | 'left' = 'right'; // ✅ Direction flag
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
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

      // ✅ Auto-scroll only in browser
    setInterval(() => {
        this.scrollGifts(this.autoScrollDirection);

        // Check if we have reached near end or start, and switch direction
        const maxScrollLeft = carouselEl.scrollWidth - carouselEl.clientWidth;
        const currentScroll = carouselEl.scrollLeft;

        if (currentScroll >= maxScrollLeft - 10) {
          this.autoScrollDirection = 'left';
        } else if (currentScroll <= 10) {
          this.autoScrollDirection = 'right';
        }
      }, 2000);
    }
  }

  scrollGifts(direction: 'left' | 'right') {
    const carouselEl = this.carousel.nativeElement;
    const scrollAmount = 220;

    if (direction === 'left') {
      carouselEl.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
      carouselEl.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
