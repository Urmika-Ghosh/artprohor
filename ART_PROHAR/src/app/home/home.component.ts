import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  Inject,
  OnDestroy,
  OnInit,
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
export class HomeComponent implements AfterViewInit, OnDestroy,OnInit {
  
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


  gifts1 = [
    { name: 'Durga Idol', image: 'assets/img1.jpg' },
    { name: 'Durga Idol', image: 'assets/img2.jpg' },
    { name: 'Durga Idol', image: 'assets/img3.jpg' },
  { name: 'Durga Idol', image: 'assets/img4.jpg' },
  { name: 'Traditional Jewelry', image: 'assets/img5.jpg' },
  { name: 'Festive Decoration', image: 'assets/img6.jpg' }
]

  activeIndex = 2;
  activeIndex1 = 0;

  ngOnInit() {
    // Auto-scroll
    if (isPlatformBrowser(this.platformId)) {
    this.centerAutoScrollInterval = setInterval(() => {
      this.next();
    }, 3000);
  }
  }

  next() {
  this.activeIndex = (this.activeIndex + 1) % this.gifts1.length;
}

prev() {
  this.activeIndex = (this.activeIndex - 1 + this.gifts1.length) % this.gifts1.length;
}

goToIndex(index: number) {
  this.activeIndex = index;
}

getLeftIndex() {
  return (this.activeIndex - 1 + this.gifts1.length) % this.gifts1.length;
}

getRightIndex() {
  return (this.activeIndex + 1) % this.gifts1.length;
}

getFarLeftIndex() {
  return (this.activeIndex - 2 + this.gifts1.length) % this.gifts1.length;
}

getFarRightIndex() {
  return (this.activeIndex + 2) % this.gifts1.length;
}


 

  getDisplayIndexes() {
    const total = this.gifts.length;
    const result = [];
    for (let offset = -2; offset <= 2; offset++) {
      let idx = (this.activeIndex + offset + total) % total;
      result.push(idx);
    }
    return result;
  }







  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  @ViewChild('familyCarousel', { static: false }) familyCarousel!: ElementRef;

  private autoScrollInterval: any;
  private familyAutoScrollInterval: any;
   private centerAutoScrollInterval: any; 

  autoScrollDirection: 'right' | 'left' = 'right';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      let startX = 0;
      const carouselEl = this.carousel.nativeElement;

      // Get one item to calculate width and gap
      const firstItem = carouselEl.querySelector(
        '.handmade-item'
      ) as HTMLElement;
      if (!firstItem) return;

      const itemWidth = firstItem.offsetWidth;
      const gap = 30; // your CSS gap (update if you change)

      // Touch swipe
      carouselEl.addEventListener('touchstart', (e: TouchEvent) => {
        startX = e.touches[0].clientX;
      });

      carouselEl.addEventListener('touchend', (e: TouchEvent) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (diff > 50) {
          this.scrollGifts('right');
        } else if (diff < -50) {
          // Disable left scroll if you don't want left movement manually
          // this.scrollGifts('left');
        }
      });

      // Auto-scroll one by one, always to the right
      this.autoScrollInterval = setInterval(() => {
        const maxScrollLeft = carouselEl.scrollWidth - carouselEl.clientWidth;

        if (carouselEl.scrollLeft >= maxScrollLeft - 5) {
          // Instantly jump back to start
          carouselEl.scrollTo({ left: 0, behavior: 'auto' });
        } else {
          // Scroll one item to the right
          carouselEl.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
        }
      }, 2000);

      // --- Family carousel logic (if you have) ---
      this.startFamilyAutoScroll();

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
    { name: 'Customer 1', Image:'assets/review/clay1.jpeg'},
    { name: 'Customer 2', Image:'assets/review/clay5.jpeg'},
    { name: 'Customer 3', Image:'assets/review/clay4.jpeg'},
    { name: 'Customer 4', Image:'assets/review/clay3.jpeg'},
    { name: 'Customer 5', Image:'assets/review/clay7.jpeg'},
    { name: 'Customer 6', Image:'assets/review/clay8.jpeg'},
    { name: 'Customer 7', Image:'assets/review/clay2.jpeg'},
    { name: 'Customer 8', Image:'assets/review/clay9.jpeg'},
    { name: 'Customer 9', Image:'assets/review/fevric1.jpg'},
    { name: 'Customer 10', Image:'assets/review/clay10.jpeg'},
    { name: 'Customer 11' , Image:'assets/review/clay6.jpeg'},
    { name: 'Customer 12' , Image:'assets/review/oxi1.jpeg'},
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
      if (
        carousel.scrollLeft + carousel.clientWidth >=
        carousel.scrollWidth - 1
      ) {
        carousel.scrollTo({ left: 0, behavior: 'auto' });
      }
    }, 20);
  }

  ngOnDestroy() {
    clearInterval(this.autoScrollInterval);
    clearInterval(this.familyAutoScrollInterval);
  }
}
