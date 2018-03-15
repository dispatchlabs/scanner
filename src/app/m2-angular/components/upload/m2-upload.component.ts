import {Component, OnInit, AfterViewInit, Output, EventEmitter, Inject, Input, OnDestroy, ViewChild, ElementRef, HostListener, forwardRef} from '@angular/core';
import {M2Service} from '../../services/m2.service';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {Media} from '../../store/states/media';

/**
 * M2UploadComponent
 */
@Component({
    selector: 'm2-upload',
    templateUrl: './m2-upload.component.html',
    styleUrls: ['./m2-upload.component.scss']
})
export class M2UploadComponent implements OnInit, AfterViewInit, OnDestroy {

    /**
     * Class level-declarations.
     */
    @Input()
    public media: Media;
    @Input()
    public deleteDisabled = false;
    @Input()
    public uploadToM2 = true;
    @Output()
    public onUpload: EventEmitter<Media> = new EventEmitter<Media>();
    @Output()
    public onDelete: EventEmitter<Media> = new EventEmitter<Media>();
    @Output()
    public onSelected: EventEmitter<File> = new EventEmitter<File>();
    @ViewChild('fileInput')
    public fileInput: ElementRef;
    public fileUploader: FileUploader;
    public spinner = false;

    /**
     *
     * @param appConfig
     * @param appService
     */
    constructor(@Inject('AppConfig') protected appConfig: any, @Inject('AppService') public appService: any) {
        const url = this.appService.getUrl(appConfig.m2Url) + '/MediaUpload';
        // this.fileUploader = new FileUploader({url: url, allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg']});
        this.fileUploader = new FileUploader({url: url});
        this.fileUploader.onBuildItemForm = (item, form) => {
            form.append('appId', appConfig.m2AppId);
            form.append('sessionId', this.appService.m2.sessionId);
        };
        this.fileUploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
            this.fileInput.nativeElement.value = '';
            this.fileUploader.clearQueue();
            this.spinner = false;
            this.appService.error('Only png, jpeg, or jpg image formats are allowed.');
        };
        this.fileUploader.onAfterAddingFile = (fileItem: any) => {
            this.spinner = true;
            if (this.uploadToM2) {
                fileItem.uploader.uploadAll();
            }
            this.onSelected.emit(fileItem._file);
        };
        this.fileUploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            this.appService.error(response);
        };
        this.fileUploader.onCompleteItem = (item: FileItem, responseJson: string, status: number, headers: ParsedResponseHeaders) => {
            const response = JSON.parse(responseJson);
            if (response.status !== 'OK') {
                this.appService.error(response.status);
            } else {
                if (this.onUpload) {
                    this.onUpload.emit(response.media);
                }
            }
        }
        this.fileUploader.onCompleteAll = () => {
            this.fileInput.nativeElement.value = '';
            this.fileUploader.clearQueue();
            this.spinner = false;
        };
    }

    /**
     *
     */
    ngOnInit() {
    }

    /**
     *
     */
    ngAfterViewInit() {
        this.fileInput.nativeElement.value = '';
    }

    /**
     *
     */
    ngOnDestroy() {
    }

    /**
     *
     */
    public delete(): void {
        if (!this.media || this.deleteDisabled) {
            return;
        }

        // Confirm delete?
        this.appService.confirm('Are you sure you want to delete image?', () => {
            this.spinner = true;
            this.appService.post('m2.action.media.DeleteAction', {mediaId: this.media.mediaId}).subscribe(response => {
                this.spinner = false;
                if (response.status !== 'OK') {
                    this.appService.error(response.humanReadableStatus);
                } else {
                    this.onDelete.emit(this.media);
                }
            });
        });
    }
}


