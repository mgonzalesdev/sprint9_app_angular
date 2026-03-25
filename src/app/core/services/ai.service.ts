import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/ai/analyze';

  analyzeImage(base64: string): Observable<any> {
    return this.http.post(this.apiUrl, { image: base64 });
  }
}