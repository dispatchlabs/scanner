import {Component, ElementRef, forwardRef, Inject, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {Meta} from '../../store/states/meta';
import {M2MetaUpdateComponent} from './m2-meta-update.component';
import {DataSource} from '@angular/cdk/collections';

/**
 *
 */
class MetaDatabase {

    public metaBehaviorSubject: BehaviorSubject<Meta[]> = new BehaviorSubject<Meta[]>([]);

    get data(): Meta[] {
        return this.metaBehaviorSubject.value;
    }

    /**
     *
     * @param {Meta[]} metas
     */
    constructor(metas: Meta[]) {
        this.metaBehaviorSubject.next(metas);
    }
}

/**
 *
 */
class MetaDataSource extends DataSource<any> {
    filterBehaviorSubject = new BehaviorSubject('');

    get filter(): string {
        return this.filterBehaviorSubject.value;
    }

    set filter(filter: string) {
        this.filterBehaviorSubject.next(filter);
    }

    constructor(private _exampleDatabase: MetaDatabase) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Meta[]> {
        const displayDataChanges = [
            this._exampleDatabase.metaBehaviorSubject,
            this.filterBehaviorSubject,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this._exampleDatabase.data.slice().filter((meta: Meta) => {
                const searchString = meta.url.toLowerCase();
                return searchString.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    disconnect() {
    }
}

/**
 *
 */
@Component({
    selector: 'm2-meta',
    templateUrl: './m2-meta.component.html',
    styleUrls: ['./m2-meta.component.scss']
})
export class M2MetaComponent implements OnInit, OnChanges, OnDestroy {

    /**
     * Class level-declarations.
     */
    displayedColumns = ['url', 'name', 'content'];
    dataSource: MetaDataSource | null;
    @ViewChild('filter') filter: ElementRef;
    private contentHandle: any;
    private metas: Meta[];
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
        this.find();
    }

    /**
     *
     */
    ngOnChanges() {
    }

    /**
     *
     */
    ngOnDestroy() {
        if (this.contentHandle) {
            this.contentHandle.destroy();
        }
    }

    public find(): void {
        this.appService.post('m2.action.meta.FindStaticByAppAction', {page: this.page, perPage: this.perPage}).subscribe(response => {
            if (response.status !== 'OK') {
                this.appService.error(response.humanReadableStatus);
            } else {
                this.count = response.count;
                this.metas = response.metas;
                this.dataSource = new MetaDataSource(new MetaDatabase(response.metas));
                Observable.fromEvent(this.filter.nativeElement, 'keyup')
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(() => {
                    if (!this.dataSource) {
                        return;
                    }
                    this.dataSource.filter = this.filter.nativeElement.value;
                });
            }
        });
    }

    /**
     *
     */
    public onPageIndexChange(event: any): void {
        this.page = event.pageIndex;
        this.perPage = event.pageSize;
        this.find();
    }

    /**
     *
     * @param {Meta} meta
     */
    public edit(meta: Meta): void {
        this.contentHandle = this.appService.createComponent(M2MetaUpdateComponent, {
            meta: meta, onFinished: (_meta) => {
                if (_meta) {
                    const index = this.metas.indexOf(meta);
                    this.metas.splice(index, 1, _meta);
                    this.dataSource = new MetaDataSource(new MetaDatabase(this.metas));
                }
                this.contentHandle.destroy();
            }
        });
    }
}
