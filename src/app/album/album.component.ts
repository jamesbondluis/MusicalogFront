import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { Observable } from 'rxjs';
import { AlbumService } from '../album.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  dataSaved = false;
  albumForm: any;
  allAlbum: Observable<Album[]>;
  albumId = null;
  message = null;

  constructor(private formbulider: FormBuilder, private albumService: AlbumService) { }

  ngOnInit() {
    this.albumForm = this.formbulider.group({
      AlbumName: ['', [Validators.required]],
      ArtistName: ['', [Validators.required]],
      Type: ['', [Validators.required]],
      Stock: ['', [Validators.required]]
    });
    this.loadAllAlbums();
  }

  loadAllAlbums() {
    this.allAlbum = this.albumService.getAll();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const album = this.albumForm.value;
    this.CreateAlbum(album);
    this.albumForm.reset();
  }

  loadAlbumToEdit(albumId: number) {
    this.albumService.get(albumId).subscribe(album => {
      this.message = null;
      this.dataSaved = false;
      this.albumId = albumId;
      this.albumForm.controls['AlbumName'].setValue(album.AlbumName);
      this.albumForm.controls['ArtistName'].setValue(album.ArtistName);
      this.albumForm.controls['Type'].setValue(album.Type);
      this.albumForm.controls['Stock'].setValue(album.Stock);
    });
  }

  CreateAlbum(album: Album) {
    if (this.albumId == null) {
      this.albumService.post(album).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Registro salvo com sucesso';
          this.loadAllAlbums();
          this.albumId = null;
          this.albumForm.reset();
        }
      );
    } else {
      album.AlbumID = this.albumId;
      this.albumService.put(this.albumId, album).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro Atualizado com sucesso';
        this.loadAllAlbums();
        this.albumId = null;
        this.albumForm.reset();
      });
    }
  }
  
  deleteAlbum(albumId: string) {
    if (confirm("Deseja deletar este album ?")) {
      this.albumService.delete(albumId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Registro deletado com sucesso';
        this.loadAllAlbums();
        this.albumId = null;
        this.albumForm.reset();
      });
    }
  }

  resetForm() {
    this.albumForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}
