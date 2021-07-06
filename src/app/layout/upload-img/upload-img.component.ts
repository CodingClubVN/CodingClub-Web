import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ApiService } from 'src/app/share/services/_core.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {
  constructor(private http: ApiService, private clipboardApi: ClipboardService) { }
  isLoading = false;
  uploadURL = 'https://api.cloudinary.com/v1_1/hieuduy175111/image/upload';
  uploadPreset = 'wjnqhfdd';
  selectedFile: any = null;
  imgUrl = '';
  status: boolean = false;
  imgSrc: string = '#';
  message = '';
  imgSize: number = 0;
  fileCheckerMessage = '';
  fileCheckerStatus: boolean = false;
  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      let reader = new FileReader();
      this.selectedFile = <File>event.target.files[0];
      this.imgSize = this.selectedFile.size / 1024 / 1024;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      }
      if(this.imgSize > 9.8) {
        this.fileCheckerStatus = false;
        this.fileCheckerMessage = 'File nặng qua trên 10MB rồi'
      }
      else {
        this.fileCheckerStatus = true;
        this.fileCheckerMessage = 'Ổn áp đó Submit đi'
      }
    }
  }

  onUpload() {
    if(this.fileCheckerStatus) {
      this.isLoading = !this.isLoading;
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name)
      fd.append('upload_preset', this.uploadPreset)
      this.http.post(this.uploadURL, fd)
      .subscribe(res => {
        this.isLoading = !this.isLoading;
        console.log(res);
        this.status = res.ok;
        this.message = res.statusText
        this.imgSrc = res.body.url;
      });
    }
    else {
      this.fileCheckerMessage = 'Chưa chọn file';
    }
  }

  copySrc() {
    this.clipboardApi.copyFromContent(this.imgSrc);
  }
}
