import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Transaction} from '../../store/states/transaction';
import {Observable} from 'rxjs/Observable';
import {Config} from '../../store/states/config';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';

@Component({
  selector: 'app-node-info',
  templateUrl: './node-info.component.html',
  styleUrls: ['./node-info.component.scss']
})
export class NodeInfoComponent implements OnInit, OnDestroy {

    /**
     * Class level declarations
     */
    @Input()
    public delegateIp: string;
    @Input()
    public transactions: Transaction [];
    public configState: Observable<Config>;
    public config: Config;
    public configSubscription: any;

    /**
    *
    * @param appService
    * @param {Store<AppState>} store
    */
    constructor(@Inject('AppService') public appService: any, private store: Store<AppState>) {
      this.configState = this.store.select('config');
      this.configSubscription = this.configState.subscribe((config: Config) => {
          this.config = config;
      });
    }

    /**
     *
     */
    ngOnInit() {}

    /**
     *
     */
    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }

}
