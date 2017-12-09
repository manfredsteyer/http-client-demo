import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private oauthService: OAuthService,
    private route: ActivatedRoute) {
  }
  
  needsLogin: boolean;

  ngOnInit() {
    
    this.needsLogin = this.route.snapshot.params['needsLogin'];
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
      this.oauthService.logOut();
  }

  get givenName() {
      var claims = this.oauthService.getIdentityClaims();
      if (!claims) return null;
      return claims['given_name'];
  }

}
