import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
  OnDestroy
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
export class HomeComponent implements AfterViewInit, OnDestroy {
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
  @ViewChild('familyCarousel', { static: false }) familyCarousel!: ElementRef;

  private autoScrollInterval: any;
  private familyAutoScrollInterval: any;

  autoScrollDirection: 'right' | 'left' = 'right';

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

      // Gift Categories: auto-scroll with reverse
      setInterval(() => {
        this.scrollGifts(this.autoScrollDirection);

        const maxScrollLeft = carouselEl.scrollWidth - carouselEl.clientWidth;
        const currentScroll = carouselEl.scrollLeft;

        if (currentScroll >= maxScrollLeft - 10) {
          this.autoScrollDirection = 'left';
        } else if (currentScroll <= 10) {
          this.autoScrollDirection = 'right';
        }
      }, 2000);

      // ARtপ্রহর Family auto-scroll loop
      this.startFamilyAutoScroll();

      // Pause/resume on hover
      const familyEl = this.familyCarousel.nativeElement;
      familyEl.addEventListener('mouseenter', () => {
        clearInterval(this.familyAutoScrollInterval);
      });
      familyEl.addEventListener('mouseleave', () => {
        this.startFamilyAutoScroll();
      });
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

  customers = [
    { name: 'Customer 1' },
    { name: 'Customer 2' },
    { name: 'Customer 3' },
    { name: 'Customer 4' },
    { name: 'Customer 5' },
    { name: 'Customer 6' },
    { name: 'Customer 7' },
    { name: 'Customer 8' },
    { name: 'Customer 9' },
    { name: 'Customer 10' },
    { name: 'Customer 11' },
    { name: 'Customer 12' },
  ];

  scrollFamily(direction: 'left' | 'right') {
    const carousel = this.familyCarousel?.nativeElement;
    if (carousel) {
      const scrollAmount = 350;
      if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }

  startFamilyAutoScroll() {
    const carousel = this.familyCarousel?.nativeElement;
    if (!carousel) return;

    this.familyAutoScrollInterval = setInterval(() => {
      carousel.scrollBy({ left: 1, behavior: 'smooth' });

      // If at end, jump back to start
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
        carousel.scrollTo({ left: 0, behavior: 'auto' });
      }
    }, 20);
  }

  ngOnDestroy() {
    clearInterval(this.autoScrollInterval);
    clearInterval(this.familyAutoScrollInterval);
  }
}
