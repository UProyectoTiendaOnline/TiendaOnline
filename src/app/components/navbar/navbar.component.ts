import { 
    Component, 
    Renderer2, 
    OnDestroy, 
    ViewChild, 
    ElementRef,
    AfterViewInit 
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  widthBreakdown: MediaQueryList;
  clickListener;
  touchListener;
 
  @ViewChild('dropdownMenu', {static: false}) dropdownMenu; 
  constructor(private renderer: Renderer2) {
      this.widthBreakdown = window.matchMedia('(min-width: 992px)');
  }

  toggleNavbar() {

  }

  checkWindowWidth = () => {
    if (this.widthBreakdown.matches) {
        this.useDesktopMenu();
    } else {
        this.useMobileMenu();
    }
  }

  eventHandler = (e) => {
    if ( 
        !this.dropdownMenu.nativeElement.contains(e.target) &&
        this.dropdownMenu.nativeElement.classList.contains('show')
      ) {
      this.dropdownMenu.nativeElement.classList.remove('show');
    }
    else if (
        e.target.parentElement.matches('.navigation__account-actions') &&
        !this.dropdownMenu.nativeElement.classList.contains('show')
      ) {
      this.dropdownMenu.nativeElement.classList.add('show');
    }
  }

  useDesktopMenu() {
      this.clickListener = this.renderer
          .listen('document', 'click', this.eventHandler);
      this.touchListener = this.renderer
          .listen('document', 'touchstart', this.eventHandler);
  }

  useMobileMenu() {
      if (this.clickListener) {
          this.clickListener()
      }
      if (this.touchListener) {
          this.touchListener()
      }
  }

  ngAfterViewInit() {
      if (this.widthBreakdown.matches) {
          this.useDesktopMenu();
      }
      
      this.widthBreakdown.addListener(this.checkWindowWidth);
  }

  ngOnDestroy() {
      if (this.clickListener) {
          this.clickListener()
      }
      if (this.touchListener) {
          this.touchListener()
      }
      this.widthBreakdown.removeListener(this.checkWindowWidth);
  }
}
