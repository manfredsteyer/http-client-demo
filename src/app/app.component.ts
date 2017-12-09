import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { authConfig } from './auth.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
