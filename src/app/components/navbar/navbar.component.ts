import {
    Component, 
    Renderer2, 
    OnDestroy, 
    ViewChild, 
    ElementRef,
    AfterViewInit
} from '@angular/core';

import {
    Router,
    Event as NavigationEvent,
    NavigationStart} from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  widthBreakdown: MediaQueryList;
  showMenu: boolean;
  loggedUser: boolean;
  clickListener;
  touchListener;
 
  @ViewChild('dropdownMenu', {static: false}) dropdownMenu; 
  constructor(private renderer: Renderer2, private router: Router) {
      this.widthBreakdown = window.matchMedia('(min-width: 992px)');
      this.showMenu = false;
      this.loggedUser = false;

      router.events
        .pipe(filter((event: NavigationEvent) => {
            return( event instanceof NavigationStart );
          }))
        .subscribe((event: NavigationStart) => {
          if (this.showMenu) {
            this.toggleMobileMenu();
          }
          if (this.widthBreakdown.matches && this.loggedUser) {
            this.dropdownMenu.nativeElement.classList.remove('show');
          }
        });
  }

  toggleMobileMenu() {
    this.showMenu = !this.showMenu;
  }

  checkWindowWidth = () => {
    if (this.widthBreakdown.matches) {
        this.useDesktopMenu();
    } else {
        this.useMobileMenu();
    }
  }

  eventHandler = (e) => {
    var targetIsDropdown = this.dropdownMenu.nativeElement.contains(e.target),
      targetIsNavAccountActions = e.target.parentElement.matches('.navigation__account-actions'),
      dropdownIsVisible = this.dropdownMenu.nativeElement.classList.contains('show');

    if (!targetIsDropdown && dropdownIsVisible) {
      this.dropdownMenu.nativeElement.classList.remove('show');
    }
    else if (targetIsNavAccountActions && !dropdownIsVisible) {
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
    if (this.loggedUser) {
        if (this.widthBreakdown.matches) {
            this.useDesktopMenu();
        }
        
        this.widthBreakdown.addListener(this.checkWindowWidth);
    }  
  }

  ngOnDestroy() {
    if (this.loggedUser) {
        if (this.clickListener) {
            this.clickListener()
        }
        if (this.touchListener) {
            this.touchListener()
        }
        this.widthBreakdown.removeListener(this.checkWindowWidth);
    }  
  }
}
