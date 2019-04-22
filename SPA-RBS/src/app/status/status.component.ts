import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ClientImage } from '../_models/clientImage';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { SymptomService } from '../_services/symptom.service';
import { ProgrammeService } from '../_services/programme.service';

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
  symptoms: any;
  programmes: any;
  clientImages: any;

  imageDescription: any;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService
    , private userService: UserService, private symptomService: SymptomService
    , private programmeService: ProgrammeService) { }

  ngOnInit() {
    this.getClient();
  }

  getClient() {
    return this.route.data.subscribe(data => {
      this.user = data['user'];
      this.userService.getClient(this.user.id).subscribe(client => {
        this.client = client;
        this.initialiseUploader();
      }, error => {
        this.alertify.error('회원 정보를 받아올 수 없습니다.');
      }, () => {
        this.getSymptoms(this.client.id);
        this.getProgrammes(this.client.id);
        this.getClientImages(this.client.id);
      });
    });
  }

  getSymptoms(clientId: number) {
    return this.symptomService.getSymptoms(clientId).subscribe(symptoms => {
      this.symptoms = symptoms;
    }, error => {
      this.alertify.error('회원 증상 목록을 받아올 수 없습니다.');
    });
  }

  getProgrammes(clientId: number) {
    return this.programmeService.getProgrammes(clientId).subscribe(programmes => {
      this.programmes = programmes;
    }, error => {
      this.alertify.error('회원 프로그램 목록을 받아올 수 없습니다');
    });
  }

  getClientImages(clientId: number) {
    return this.userService.getClientImages(clientId).subscribe(images => {
      this.clientImages = images;
    }, error => {
      this.alertify.error('회원 사진 목록을 받아올 수 없습니다');
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
        this.clientImages.push(clientImage);
      }
    };
  }

  deletePhoto(imageId: number) {
    return this.alertify.confirm('이 사진을 삭제하시겠습니까?', () => {
      this.userService.deletePhoto(this.client.id, imageId).subscribe(() => {
        this.clientImages.splice(this.clientImages.findIndex(p => p.id === imageId), 1);
        this.alertify.success('사진을 성공적으로 삭제하였습니다.');
      }, error => {
        this.alertify.error('사진 삭제에 실패하였습니다.');
      });
    });
  }

}
