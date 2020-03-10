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
import {Subscription} from 'rxjs';

import {AuthService} from '../../servicios/auth.service';
import {SearchModalService} from '../../servicios/search-modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private widthBreakdown: MediaQueryList;
  private showMenu: boolean;
  private subscription:Subscription;
  private clickListener;
  private touchListener;
  user: any;
 
  @ViewChild('dropdownMenu', {static: false}) dropdownMenu; 
  constructor(
    private _renderer: Renderer2, 
    private _router: Router, 
    public _authService: AuthService,
    public _modalService: SearchModalService) {
      this.widthBreakdown = window.matchMedia('(min-width: 992px)');
      this.showMenu = false;

      this.subscription = this._authService.user
        .subscribe(user => {
          this.user = user;
          if (user) {
            this.checkWindowWidth();
          } else {
            if (this.dropdownMenu) {
              this.dropdownMenu.nativeElement.classList.remove('show');
            }
            this.destroyListeners();
          }
        });

      _router.events
        .pipe(filter((event: NavigationEvent) => {
            return( event instanceof NavigationStart );
          }))
        .subscribe((event: NavigationStart) => {
          if (this.showMenu) {
            this.toggleMobileMenu();
          }
          if (this.widthBreakdown.matches && this.user) {
            this.dropdownMenu.nativeElement.classList.remove('show');
          }
        });
  }

  toggleMobileMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this._renderer.addClass(document.documentElement, 'cdk-global-scrollblock');
    } else {
      this._renderer.removeClass(document.documentElement, 'cdk-global-scrollblock');
    }
  }

  checkWindowWidth = () => {
    if (this.user) {
      if (this.widthBreakdown.matches) {
          this.useDesktopMenu();
      } else {
          this.useMobileMenu();
      }
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
    this.clickListener = this._renderer
      .listen('document', 'click', this.eventHandler);
    this.touchListener = this._renderer
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

  toggleByCarModal() {
    this.toggleMobileMenu();
    this._modalService.toggleByCarModal();
  }

  toggleBySizeModal() {
    this.toggleMobileMenu();
    this._modalService.toggleBySizeModal();
  }

  ngAfterViewInit() {
    if (this.user && this.widthBreakdown.matches) {
      this.useDesktopMenu();
    }
    this.widthBreakdown.addListener(this.checkWindowWidth);
  }

  destroyListeners() {
    if (this.clickListener) {
      this.clickListener()
    }
    if (this.touchListener) {
      this.touchListener()
    }
  }

  ngOnDestroy() {
    this.destroyListeners(); 
    this.widthBreakdown.removeListener(this.checkWindowWidth);
    this.subscription.unsubscribe();
  }
}
