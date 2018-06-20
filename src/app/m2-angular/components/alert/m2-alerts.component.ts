import {Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Inject, forwardRef} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import {Alert} from '../../store/states/alert';
import {M2Service} from '../../services/m2.service';

/**
 *
 */
class AlertDatabase {

    /**
     * Class level-declarations.
     */
    public alertBehaviorSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);

    /**
     *
     * @returns {Alert[]}
     */
    get data(): Alert[] {
        return this.alertBehaviorSubject.value;
    }

    /**
     *
     * @param {Alert[]} alerts
     */
    constructor(alerts: Alert[]) {
        this.alertBehaviorSubject.next(alerts);
    }
}

/**
 *
 */
class AlertDataSource extends DataSource<any> {

    /**
     *
     * @param {AlertDatabase} alertDatabase
     */
    constructor(private alertDatabase: AlertDatabase) {
        super();
    }

    /**
     *
     * @returns {Observable<Alert[]>}
     */
    connect(): Observable<Alert[]> {
        return this.alertDatabase.alertBehaviorSubject;
    }

    /**
     *
     */
    disconnect() {
    }
}

/**
 * M2AlertsComponent
 */
@Component({
    selector: 'm2-alerts',
    templateUrl: './m2-alerts.component.html',
    encapsulation: ViewEncapsulation.None
})
export class M2AlertsComponent implements OnInit, AfterViewInit {

    /**
     * Class level-declarations.
     */
    public displayedColumns = ['message', 'updated', 'created'];
    public dataSource: AlertDataSource | null;
    public page = 0;
    public perPage = 10;
    public count = 0;

    /**
     *
     * @param appService
     */
    constructor(@Inject('AppService') public appService: any) {
    }

    /**
     *
     */
    ngOnInit() {
        this.count = this.appService.m2.alerts.length;
        this.dataSource = new AlertDataSource(new AlertDatabase(this.appService.m2.alerts));
    }

    /**
     *
     */
    ngAfterViewInit() {
    }
}
