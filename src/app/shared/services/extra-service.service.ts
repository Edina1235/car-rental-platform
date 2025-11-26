import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ExtraService } from 'src/app/core/models/extra-services';

@Injectable({
  providedIn: 'root'
})
export class ExtraServiceService {
  public main_url = 'http://localhost/api/extra-service';

  private readonly http = inject(HttpClient);

  public getExtraServiceWithId(id: string) {
    return this.http.get(this.main_url + `/${id}`, {withCredentials: true});
  }

  public getExtraServices() {
    return this.http.get(this.main_url, {withCredentials: true});
  }

  public createExtraService(extraService: ExtraService) {
    return this.http.post(this.main_url, extraService, {withCredentials: true});
  }

  public updateExtraServiceWithId(id: string, extraService: ExtraService) {
    return this.http.put(this.main_url + `/${id}`, extraService, {withCredentials: true});
  }

  public deleteExtraServiceWithId(id: string) {
    return this.http.delete(this.main_url + `/${id}`, {withCredentials: true});
  }
}
