import { Component, OnInit, TemplateRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ClientImage } from '../_models/clientImage';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent implements OnInit {
  baseUrl = environment.apiUrl + 'users/clients/';

  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  user: User;
  client: any;
  clientImages: any;

  imageDescription: any;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService
    , private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    return this.route.data.subscribe(data => {
      this.user = data['user'];
      this.userService.getClient(this.user.id).subscribe(response => {
        this.client = response;
        this.initialiseUploader();
      }, error => {
        this.alertify.error('회원 정보를 받아올 수 없습니다.');
      });
    });
  }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  initialiseUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + this.client.id + '/clientImages',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: ClientImage = JSON.parse(response);
        const clientImage = {
          id: res.id,
          url: res.url,
          dateTaken: res.dateTaken,
          description: res.descrirption,
        };
        this.client.clientImages.push(clientImage);
      }
    };
  }

  deletePhoto(imageId: number) {
    return this.alertify.confirm('이 사진을 삭제하시겠습니까?', () => {
      this.userService.deletePhoto(this.client.id, imageId).subscribe(() => {
        this.client.clientImages.splice(this.client.clientImages.findIndex(p => p.id === imageId), 1);
        this.alertify.success('사진을 성공적으로 삭제하였습니다.');
      }, error => {
        this.alertify.error('사진 삭제에 실패하였습니다.');
      });
    });
  }

}
