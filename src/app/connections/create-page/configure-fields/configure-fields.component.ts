import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

import { CurrentConnectionService } from '../current-connection';
import { Connection } from '../../../model';
import { log } from '../../../logging';
import { CanComponentDeactivate } from '../../../common/can-deactivate-guard.service';

@Component({
  selector: 'syndesis-connections-configure-fields',
  templateUrl: 'configure-fields.component.html',
})
export class ConnectionsConfigureFieldsComponent implements OnInit, CanComponentDeactivate {
  constructor(
    private current: CurrentConnectionService,
    private route: ActivatedRoute,
    private router: Router,
    private detector: ChangeDetectorRef,
  ) {}

  get connection(): Connection {
    return this.current.connection;
  }

  set connection(connection: Connection) {
    this.current.connection = connection;
  }

  get hasCredentials() {
    return this.current.hasCredentials();
  }

  acquireCredentials() {
    // TODO
    window.alert('I don\'t work yet');
  }

  ngOnInit() {
    /*
    log.infoc(() => 'Credentials: ' + JSON.stringify(this.current.credentials));
    log.infoc(() => 'hasCredentials: ' + this.current.hasCredentials());
    */
  }

  canDeactivate(nextState: RouterStateSnapshot) {
    return nextState.url === '/connections/create/cancel' ||
           nextState.url === '/connections/create/connection-basics' ||
           nextState.url === '/connections/create/review' ||
           window.confirm('Discard changes?');
  }
}
