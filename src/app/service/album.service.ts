import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from "../models/album.model";
import {MessageService} from './message.service';
import {Track} from "../models/track.model";

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private spotifyUrl = 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy?market=FR';  // URL to web api
  private oAuthToken = 'BQDmNkFrTZm8TSsZIazE_G7ubIQp3YsimI5570ZMr6usWN-7qmY5qNiY1lw1_RxQaCA2eIXbled6cv87Y8LLW09_f1H56PEFRdr9_EA5CHLRWxeb_OzdGvJAQ6NxB33R-uRnFQD_5Rc6'; // https://developer.spotify.com/console/get-album/?id=0sNOF9WDwhWunNAHPD3Baj&market=FR
  private albumImg = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getTracks(): Observable<Album[]> {
    this.messageService.add('AlbumService: fetched tracks');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oAuthToken
    })
    return this.http.get<Album[]>(this.spotifyUrl, {headers: headers});
  }

  getTrack(id: string): Observable<Track> {
    this.messageService.add(`AlbumService: fetched track id=${id}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oAuthToken
    });
    return this.http.get<Track>('https://api.spotify.com/v1/tracks/' + id + '?market=FR', {headers: headers});
  }

  setAlbumImg(url: string)
  {
    this.albumImg = url;
  }

  getAlbumImg() {
    return this.albumImg;
  }
}
